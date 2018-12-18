<script>
    module.exports = {
        data: function () {
            return {
                isLoading: true,
                roles: [],
                users: [],
            };
        },

        created: function () {
            this.loadRoles();
            this.loadUsers();
        },

        methods: {
            loadRoles: function () {
                var self = this;

                Nova.request().get("/genealabs/laravel-governor/nova/roles")
                    .then(function (response) {
                        self.roles = Object.assign({}, response.data);

                        if (self.users.length > 0) {
                            self.isLoading = false;
                        }
                    });
            },

            loadUsers: function () {
                var self = this;

                Nova.request().get("/genealabs/laravel-governor/nova/users")
                    .then(function (response) {
                        self.users = Object.assign([], response.data);

                        if (self.roles.length > 0) {
                            self.isLoading = false;
                        }
                    });
            },

            updateAssignment: _.debounce(function (selectedUsers, role) {
                var self = this;
                var userIds = _.map(selectedUsers, function (user) {
                    return user.id;
                });

                Nova.request().put("/genealabs/laravel-governor/nova/assignments/" + role, {
                        user_ids: userIds,
                    })
                    .then(function (response) {
                        self.$toasted.show("Role '" + role + "' user assignments updated successfully.", {type: "success"});
                    });
            }, 1000),
        },
    };
</script>

<template>
    <div>
        <heading class="mb-6">Assignments</heading>
        <loading-card
            :loading="isLoading"
        >
            <form autocomplete="off">
                <div v-for="role in roles"
                    :key="role.name"
                >
                    <div class="flex border-b border-40">
                        <div class="w-1/5 py-6 px-8">
                            <label class="inline-block text-80 pt-2 leading-tight">
                                {{ role.name }}
                            </label>
                        </div>
                        <div class="py-6 px-8 w-4/5">
                            <multiselect
                                v-model="role.users"
                                :options="users"
                                :allow-empty="true"
                                track-by="name"
                                label="name"
                                :multiple="true"
                                :hideSelected="true"
                                :clearOnSelect="true"
                                @input="updateAssignment($event, role)"
                            ></multiselect>
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
