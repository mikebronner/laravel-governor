<script>
    module.exports = {
        data: function () {
            return {
                entities: [],
                group: {
                    name: "",
                    entities: [],
                },
            };
        },

        created: function () {
            this.loadAvailableEntities();
        },

        computed: {
            availableEntities: function () {
                return _.filter(this.entities, function (entity) {
                    return entity.group_name.length === 0;
                });
            },
        },

        methods: {
            createAndAddAnother: function () {
                this.save('/laravel-nova-governor/groups/create');
            },

            createGroup: function () {
                this.save('/laravel-nova-governor/groups');
            },

            loadAvailableEntities: function () {
                var self = this;

                axios.get("/genealabs/laravel-governor/nova/entities")
                    .then(function (response) {
                        self.entities = Object.assign([], response.data);
                        self.isLoading = false;
                    });
            },
            
            save: function(redirectUrl) {
                var self = this;

                Nova.request()
                    .post("/genealabs/laravel-governor/nova/groups",
                        {
                            name: this.group.name,
                            entity_names: _.map(this.group.entities, function (entity) {
                                return entity.name;
                            }),
                        }
                    )
                    .then(function (response) {
                        self.$toasted.show("Group '" + self.group.name + "' created successfully.", {type: "success"});
                        self.$router.push(redirectUrl);
                    })
                    .catch(function (error) {
                        self.$toasted.show(error.response.data, {type: "error"});
                    });
            },
        },
    };
</script>

<template>
    <div>
        <heading class="mb-6">Create Group</heading>
        <loading-card
            :loading="false"
        >
            <form autocomplete="off">
                <div>
                    <div class="flex border-b border-40">
                        <div class="w-1/5 py-6 px-8">
                            <label class="inline-block text-80 pt-2 leading-tight">
                                Name
                            </label>
                        </div>
                        <div class="py-6 px-8 w-1/2">
                            <input type="text"
                                placeholder="Name"
                                class="w-full form-control form-input form-input-bordered"
                                v-model="group.name"
                            >
                        </div>
                    </div>
                </div>
                <div>
                    <div class="flex border-b border-40">
                        <div class="w-1/5 py-6 px-8">
                            <label class="inline-block text-80 pt-2 leading-tight">
                                Entities
                            </label>
                        </div>
                        <div class="py-6 px-8 w-4/5">
                            <multiselect
                                v-model="group.entities"
                                :options="entities"
                                :allow-empty="true"
                                track-by="name"
                                label="name"
                                :multiple="true"
                                :hideSelected="true"
                                :clearOnSelect="true"
                            ></multiselect>
                        </div>
                    </div>
                </div>
                <div class="bg-30 flex px-8 py-4">
                    <button
                        type="button"
                        class="btn btn-default btn-primary inline-flex items-center relative ml-auto mr-3"
                        dusk="create-and-add-another-button"
                        @click="createAndAddAnother"
                    >
                        <span class="">
                            Create &amp; Add Another
                        </span>
                    </button>
                    <button
                        type="button"
                        class="btn btn-default btn-primary inline-flex items-center relative"
                        dusk="create-button"
                        @click="createGroup"
                    >
                        <span class="">
                            Create Group
                        </span>
                    </button>
                </div>
            </form>
        </loading-card>
    </div>
</template>

<style scoped lang="scss">
    .card table:last-child {
        tr:last-child {
            td:first-child {
                border-bottom-left-radius: .5rem;
            }

            td:last-child {
                border-bottom-right-radius: .5rem;
            }
        }
    }
</style>
