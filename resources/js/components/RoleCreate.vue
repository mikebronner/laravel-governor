<script>
    module.exports = {
        data: function () {
            return {
                role: {
                    name: "",
                    description: "",
                },
            };
        },

        methods: {
            updateRole: _.debounce(function () {
                var self = this;

                Nova.request()
                    .post("/genealabs/laravel-governor/nova/roles",
                        {
                            name: this.role.name,
                            description: this.role.description,
                        }
                    )
                    .then(function (response) {
                        self.$toasted.show("Role '" + self.role.name + "' created successfully.", {type: "success"});
                        self.$router.push('/laravel-nova-governor/permissions/' + self.role.name);
                    })
                    .catch(function (error) {
                        self.$toasted.show(error.response.data, {type: "error"});
                    });
            }, 350),
        },
    };
</script>

<template>
    <div>
        <heading class="mb-6">Create Role</heading>
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
                                v-model="role.name"
                                @input="updateRole"
                            >
                        </div>
                    </div>
                </div>
                <div>
                    <div class="flex border-b border-40">
                        <div class="w-1/5 py-6 px-8">
                            <label class="inline-block text-80 pt-2 leading-tight">
                                Description
                            </label>
                        </div>
                        <div class="py-6 px-8 w-4/5">
                            <textarea rows="5"
                                placeholder="Description"
                                class="w-full form-control form-input form-input-bordered py-3 h-auto"
                                v-model="role.description"
                                @input="updateRole"
                            ></textarea>
                        </div>
                    </div>
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
