<script>
    module.exports = {
        data: function () {
            return {
                binarySelectOptions: [
                    "any",
                    "no",
                ],
                deleteModalOpen: false,
                groupsIsLoading: true,
                originalRoleName: "",
                permissionsIsLoading: true,
                permissions: [],
                role: {
                    name: "",
                    description: "",
                },
                roleIsLoading: true,
                selectOptions: [
                    "own",
                    "any",
                    "no",
                ],
            };
        },

        created: function () {
            this.originalRoleName = this.$route.params.role;
            this.loadRole();
            this.loadPermissions();
        },

        methods: {
            closeDeleteModal: function () {
                this.deleteModalOpen = false;
            },

            confirmDelete: function () {
                var self = this;

                Nova.request()
                    .delete("/genealabs/laravel-governor/nova/roles/" + this.originalRoleName)
                    .then(function (response) {
                        self.$toasted.show("Role '" + self.originalRoleName + "' deleted successfully.", {type: "success"});
                        self.$router.push('/laravel-nova-governor/roles');
                    })
                    .catch(function (error) {
                        self.$toasted.show(error.response, {type: "error"});
                    });
            },

            loadGroups: function () {
                var self = this;

                axios.get("/genealabs/laravel-governor/nova/groups")
                    .then(function (response) {
                        self.groups = Object.assign([], response.data);
                        self.groupsIsLoading = false;
                    });
            },

            loadPermissions: function () {
                var self = this;

                axios.get("/genealabs/laravel-governor/nova/permissions?filter=role_name&value=" + this.originalRoleName)
                    .then(function (response) {
                        self.permissions = Object.assign({}, response.data);
                        self.permissionsIsLoading = false;
                    });
            },

            loadRole: function () {
                var self = this;

                axios.get("/genealabs/laravel-governor/nova/roles/" + this.originalRoleName)
                    .then(function (response) {
                        self.role = Object.assign({}, response.data);
                        self.roleIsLoading = false;
                    });
            },

            openDeleteModal: function () {
                this.deleteModalOpen = true;
            },

            updatePermissions: function () {
                var self = this;

                Nova.request()
                    .put("/genealabs/laravel-governor/nova/roles/" + this.originalRoleName,
                        {
                            name: this.role.name,
                            description: this.role.description,
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

            updateRole: _.debounce(function () {
                var self = this;

                Nova.request()
                    .put("/genealabs/laravel-governor/nova/roles/" + this.originalRoleName,
                        {
                            name: this.role.name,
                            description: this.role.description,
                        }
                    )
                    .then(function (response) {
                        self.$toasted.show("Role updated successfully.", {type: "success"});
                        self.originalRoleName = self.role.name;
                        self.$router.replace({
                            path: '/laravel-nova-governor/permissions/' + self.role.name,
                        });
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
        <div class="flex" style="">
            <div class="relative h-9 mb-6 flex-no-shrink">
                <heading class="mb-6">Edit Role</heading>
            </div>
            <div class="w-full flex items-center mb-6">
                <div class="flex w-full justify-end items-center mx-3"></div>
                <div class="flex-no-shrink ml-auto">
                    <button
                        @click="openDeleteModal"
                        class="btn btn-default btn-icon btn-white"
                        :title="__('Delete')"
                    >
                        <icon type="delete" class="text-80" />
                    </button>
                    <portal to="modals">
                        <transition name="fade">
                            <delete-resource-modal
                                v-if="deleteModalOpen"
                                @confirm="confirmDelete"
                                @close="closeDeleteModal"
                                mode="delete"
                            >
                                <div class="p-8">
                                    <heading :level="2" class="mb-6">{{ __('Delete Role') }}</heading>
                                    <p class="text-80 leading-normal">{{__("Are you sure you want to delete the the '" + role.name + "' role?")}}</p>
                                </div>
                            </delete-resource-modal>
                        </transition>
                    </portal>
                </div>
            </div>
        </div>
        <loading-card
            :loading="roleIsLoading"
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
        <heading class="mt-8 mb-6">Permissions</heading>
        <loading-view
            v-for="(group, groupName) in permissions"
            :key="'group-' + groupName"
            :loading="permissionsIsLoading"
        >
            <h2 class="mt-6 mb-3 text-80 font-normal text-2xl"
                v-text="groupName"
            ></h2>

            <card
                :loading="permissionsIsLoading"
            >
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
                                        :options="binarySelectOptions"
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
                                        :options="selectOptions"
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
                                        :options="selectOptions"
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
                                        :options="selectOptions"
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
                                        :options="selectOptions"
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
                                        :options="selectOptions"
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
                                        :options="selectOptions"
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
        </loading-view>
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
