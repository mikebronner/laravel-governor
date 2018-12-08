<script>
    module.exports = {
        data: function () {
            return {
                isLoading: true,
                roles: [],
            };
        },

        created: function () {
            this.loadRoles();
        },

        methods: {
            loadRoles: function () {
                var self = this;

                axios.get("/genealabs/laravel-governor/nova/roles")
                    .then(function (response) {
                        console.log(response);
                        self.roles = Object.assign({}, response.data);
                        self.isLoading = false;
                    });
            },
        },
    };
</script>

<template>
    <div>
        <div class="flex" style="">
            <div class="relative h-9 mb-6 flex-no-shrink">
                <heading class="mb-6">Roles</heading>
            </div>
            <div class="w-full flex items-center mb-6">
                <div class="flex w-full justify-end items-center mx-3"></div>
                <div class="flex-no-shrink ml-auto">
                    <router-link
                        tag="button"
                        :to="{name: 'laravel-nova-governor-role-create'}"
                        class="btn btn-default btn-primary"
                    >
                        Create Role
                    </router-link>
                </div>
            </div>
        </div>

        <loading-card
            :loading="isLoading"
        >
            <div class="overflow-hidden overflow-x-auto relative">
                <table cellpadding="0" cellspacing="0" data-testid="resource-table" class="table w-full">
                    <thead>
                        <tr>
                            <th class="text-left">
                                <span dusk="sort-name" class="cursor-pointer inline-flex items-center">
                                    Name
                                </span>
                            </th>
                            <th class="text-left">
                                Description
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <router-link
                            v-for="role in roles"
                            :key="role.name"
                            tag="tr"
                            :to="{name: 'laravel-nova-governor-permissions', params: {role: role.name} }"
                            :class="{'disabled': role.name == 'SuperAdmin'}"
                            class="cursor-pointer font-normal dim text-white mb-6 text-base no-underline"
                        >
                            <td>
                                <span class="whitespace-no-wrap text-left">
                                    {{ role.name }}
                                </span>
                            </td>
                            <td>
                                <span class="text-left">
                                    {{ role.description }}
                                </span>
                            </td>
                        </router-link>
                    </tbody>
                </table>
            </div>
        </loading-card>
    </div>
</template>

<style scoped lang="scss">
    tr.disabled {
        pointer-events: none;
    }
</style>
