<script>
export default {
    props: [
        'resourceName',
        'resourceId',
        'field',
    ],

    data: function () {
        return {
            binarySelectOptions: [
                "any",
                "no",
            ],
            permissions: [],
            permissionsIsLoading: true,
            anySelectOptions: [
                "own",
                "any",
                "no",
            ],
            ownSelectOptions: [
                "own",
                "no",
            ],
            noSelectOptions: [
                "no",
            ],
        };
    },

    created: function () {
        this.loadTeamOwnerPermissions();
    },

    mounted: function () {
        //
    },

    computed: {
        filteredPermissions: function () {
            var self = this;
            var results = _.mapValues(this.permissions, function (group) {
                var results = _.mapValues(group, function (permission, permissionName) {
                    var result = {};
                    var foundPermission = _.find(self.ownerPermissions, function (ownerPermission) {
                        return ownerPermission.entity_name == permissionName;
                    });

                    if ((foundPermission || false) == false) {
                        return null;
                    }

                    result[permissionName] = _.filter(group, function (permission) {
                        return _.some(permission, function (ownership) {
                            return _.includes(["any", "own"], ownership);
                        });
                    })[0];

                    return result;
                });

                results = _.omitBy(results, function (permission) {
                    return permission == null;
                });

                return results;
            });
            results = _.omitBy(results, function (group) {
                return _.keys(group).length == 0;
            });

            return results;
        },
    },

    methods: {
        getOptionsFor: function (action, entity) {
            var effectivePermission = _.filter(this.ownerPermissions, function (permission) {
                return permission.action_name == action
                    && permission.entity_name == entity;
            })[0];

            if (((effectivePermission || {}).ownership_name || "") == "any") {
                if (effectivePermission.action_name == "create"
                    || effectivePermission.action_name == "viewAny"
                ) {
                    return this.binarySelectOptions;
                }

                return this.anySelectOptions;
            }

            if (((effectivePermission || {}).ownership_name || "") == "own") {
                return this.ownSelectOptions;
            }

            return this.noSelectOptions;
        },

        loadTeamOwnerPermissions: function () {
            var self = this;

            Nova.request()
                .get("/genealabs/laravel-governor/nova/permissions?owner=yes&filter=team_id&value=" + this.resourceId)
                .then(function (response) {
                    self.ownerPermissions = Object.assign({}, response.data);
                    self.loadPermissions();
                })
                .catch(function (error) {
                    console.error(error.response);
                });
        },

        loadPermissions: function () {
            var self = this;

            Nova.request()
                .get("/genealabs/laravel-governor/nova/permissions?filter=team_id&value=" + this.resourceId)
                .then(function (response) {
                    self.permissions = Object.assign({}, response.data);
                    self.permissionsIsLoading = false;
                })
                .catch(function (error) {
                    console.error(error.response);
                });
        },

        updatePermissions: function () {
            var self = this;

            Nova.request()
                .put("/genealabs/laravel-governor/nova/teams/" + this.resourceId,
                    {
                        permissions: this.permissions,
                    }
                )
                .then(function (response) {
                    self.$toasted.show("Permissions updated successfully.", {type: "success"});
                })
                .catch(function (error) {
                    self.$toasted.show(error.response, {type: "error"});
                });
        },
    },
}
</script>

<template>
    <div>
        <loading-view
            :loading="permissionsIsLoading"
        >
            <h1 class="mb-3 text-90 font-normal text-2xl">Permissions</h1>
            <p class="intro mb-4">
                The permissions below apply to all team members, as well as the
                team owner, in addition to the regular role permissions, which
                each user gets according to the role(s) they are associated
                with.
            </p>
            <p class="intro mb-4">
                Keep in mind that permissions are additive, so a lesser
                permission set here will not restrict that user, if they have
                higher permissions granted through their role.
            </p>
            <div
                v-for="(group, groupName) in filteredPermissions"
                :key="'group-' + groupName"
            >
                <h2 class="mt-6 mb-3 text-70 font-normal text-2xl"
                    v-text="groupName"
                ></h2>
                <card>
                    <div class="relative">
                        <table cellpadding="0"
                            cellspacing="0"
                            class="table w-full"
                        >
                            <thead>
                                <tr class="bg-none">
                                    <th class="rounded-tl">
                                        Entity
                                    </th>
                                    <th>
                                        Create
                                    </th>
                                    <th>
                                        ViewAny
                                    </th>
                                    <th>
                                        View
                                    </th>
                                    <th>
                                        Update
                                    </th>
                                    <th>
                                        Delete
                                    </th>
                                    <th>
                                        Restore
                                    </th>
                                    <th class="rounded-tr">
                                        Force Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(permission, name) in group"
                                    :key="name"
                                    class="hover:bg-none"
                                >
                                    <td class="whitespace-no-wrap text-left capitalize">
                                        {{ name }}
                                    </td>
                                    <td>
                                        <multiselect
                                            v-model="permissions[groupName][name]['create']"
                                            :options="getOptionsFor('create', name)"
                                            select-label=""
                                            deselect-label=""
                                            selected-label=""
                                            :searchable="false"
                                            :close-on-select="true"
                                            :allow-empty="false"
                                            @input="updatePermissions"
                                        ></multiselect>
                                    </td>
                                    <td>
                                        <multiselect
                                            v-model="permissions[groupName][name]['viewAny']"
                                            :options="getOptionsFor('viewAny', name)"
                                            select-label=""
                                            deselect-label=""
                                            selected-label=""
                                            :searchable="false"
                                            :close-on-select="true"
                                            :allow-empty="false"
                                            @input="updatePermissions"
                                        ></multiselect>
                                    </td>
                                    <td>
                                        <multiselect
                                            v-model="permissions[groupName][name]['view']"
                                            :options="getOptionsFor('view', name)"
                                            select-label=""
                                            deselect-label=""
                                            selected-label=""
                                            :searchable="false"
                                            :close-on-select="true"
                                            :allow-empty="false"
                                            @input="updatePermissions"
                                        ></multiselect>
                                    </td>
                                    <td>
                                        <multiselect
                                            v-model="permissions[groupName][name]['update']"
                                            :options="getOptionsFor('update', name)"
                                            select-label=""
                                            deselect-label=""
                                            selected-label=""
                                            :searchable="false"
                                            :close-on-select="true"
                                            :allow-empty="false"
                                            @input="updatePermissions"
                                        ></multiselect>
                                    </td>
                                    <td>
                                        <multiselect
                                            v-model="permissions[groupName][name]['delete']"
                                            :options="getOptionsFor('delete', name)"
                                            select-label=""
                                            deselect-label=""
                                            selected-label=""
                                            :searchable="false"
                                            :close-on-select="true"
                                            :allow-empty="false"
                                            @input="updatePermissions"
                                        ></multiselect>
                                    </td>
                                    <td>
                                        <multiselect
                                            v-model="permissions[groupName][name]['restore']"
                                            :options="getOptionsFor('restore', name)"
                                            select-label=""
                                            deselect-label=""
                                            selected-label=""
                                            :searchable="false"
                                            :close-on-select="true"
                                            :allow-empty="false"
                                            @input="updatePermissions"
                                        ></multiselect>
                                    </td>
                                    <td>
                                        <multiselect
                                            v-model="permissions[groupName][name]['forceDelete']"
                                            :options="getOptionsFor('forceDelete', name)"
                                            select-label=""
                                            deselect-label=""
                                            selected-label=""
                                            :searchable="false"
                                            :close-on-select="true"
                                            :allow-empty="false"
                                            @input="updatePermissions"
                                        ></multiselect>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </card>
            </div>
        </loading-view>
    </div>
</template>

<style scoped lang="scss">
    .intro {
        max-width: 45em;
    }
</style>
