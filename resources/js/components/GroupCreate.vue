<script>
    module.exports = {
        data: function () {
            return {
                entities: [],
                group: {
                    name: "",
                    entities: [],
                },
                groupName: this.$router.currentRoute.params.groupName,
                isLoadingEntities: true,
                isLoadingGroup: true,
            };
        },

        created: function () {
            this.loadGroup();
            this.loadAvailableEntities();
        },

        computed: {
            availableEntities: function () {
                var entities = _.filter(this.entities, function (entity) {
                    return (entity.group_name || "").length === 0;
                });

                return entities.concat(this.group.entities);
            },

            isCreating: function () {
                return ! this.isEditing;
            },

            isEditing: function () {
                return this.$router.currentRoute.params.groupName;
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
                        self.isLoadingEntities = false;
                    });
            },

            loadGroup: function () {
                var self = this;
                var groupName = this.$router.currentRoute.params.groupName;

                if ((groupName || "").length === 0) {
                    return;
                }

                axios.get("/genealabs/laravel-governor/nova/groups/" + groupName)
                    .then(function (response) {
                        console.log(response.data);
                        self.group.name  = response.data.name;
                        self.group.entities = response.data.entities;
                        self.isLoadingGroup = false;
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
            :loading="isLoadingEntities && isLoadingGroup"
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
                                :options="availableEntities"
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
                        v-if="isCreating"
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
                        v-if="isEditing"
                        type="button"
                        class="btn btn-default btn-primary inline-flex items-center relative ml-auto"
                        dusk="create-button"
                        @click="createGroup"
                    >
                        <span>
                            Update Group
                        </span>
                    </button>
                    <button
                        v-if="isCreating"
                        type="button"
                        class="btn btn-default btn-primary inline-flex items-center relative"
                        dusk="create-button"
                        @click="createGroup"
                    >
                        <span>
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
