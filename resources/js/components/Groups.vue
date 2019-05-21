<script>
    module.exports = {
        data: function () {
            return {
                groups: [],
                groupToBeDeleted: {},
                isDeleteModalVisible: false,
                isDeleting: false,
                isLoading: true,
            };
        },

        created: function () {
            this.loadGroups();
        },

        computed: {
            hasGroups: function () {
                return (this.groups.length > 0);
            },

            hasNoGroups: function () {
                return ! this.hasGroups;
            },
        },

        methods: {
            deleteGroup: function () {
                var self = this;

                this.isDeleting = true;
                axios.delete("/genealabs/laravel-governor/nova/groups/" + this.groupToBeDeleted.name)
                    .then(function (response) {
                        self.isDeleting = false;
                        self.isDeleteModalVisible = false;
                        self.$toasted.show("Group '" + self.groupToBeDeleted.name + "' deleted successfully.", {type: "success"});
                        self.groups = _.filter(self.groups, function (group) {
                            return group.name !== self.groupToBeDeleted.name;
                        });
                    });
            },

            entityNames: function (group) {
                return _.chain(group.entities)
                    .map(function (entity) {
                        return entity.name;
                    })
                    .reduce(function (carry, name) {
                        return carry + ", " + name;
                    });
            },

            hideDeleteModal: function () {
                this.isDeleteModalVisible = false;
                this.groupToBeDeleted = {};
            },

            loadGroups: function () {
                var self = this;

                axios.get("/genealabs/laravel-governor/nova/groups")
                    .then(function (response) {
                        self.groups = Object.assign([], response.data);
                        self.isLoading = false;
                    });
            },

            showDeleteModalFor: function (group) {
                this.groupToBeDeleted = group;
                this.isDeleteModalVisible = true;
            },
        },
    };
</script>

<template>
    <div>
        <div class="flex" style="">
            <div class="relative h-9 mb-6 flex-no-shrink">
                <heading class="mb-6">Groups</heading>
            </div>
            <div class="w-full flex items-center mb-6">
                <div class="flex w-full justify-end items-center mx-3"></div>
                <div class="flex-no-shrink ml-auto">
                    <router-link
                        tag="button"
                        :to="{name: 'laravel-nova-governor-groups-create'}"
                        class="btn btn-default btn-primary"
                    >
                        Create Group
                    </router-link>
                </div>
            </div>
        </div>

        <loading-card
            :loading="isLoading"
        >
            <div class="overflow-hidden overflow-x-auto relative">
                <table cellpadding="0" cellspacing="0" data-testid="resource-table" class="table w-full">
                    <thead
                        v-if="hasGroups"
                    >
                        <tr>
                            <th class="text-left">
                                Name
                            </th>
                            <th class="text-left">
                                Entities
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="hasNoGroups">
                            <div class="flex justify-center items-center px-6 py-8">
                                <div class="text-center no-underline">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="65" height="51" viewBox="0 0 65 51" class="mb-3"><g id="Page-1" fill="none" fill-rule="evenodd"><g id="05-blank-state" fill="#A8B9C5" fill-rule="nonzero" transform="translate(-779 -695)"><path id="Combined-Shape" d="M835 735h2c.552285 0 1 .447715 1 1s-.447715 1-1 1h-2v2c0 .552285-.447715 1-1 1s-1-.447715-1-1v-2h-2c-.552285 0-1-.447715-1-1s.447715-1 1-1h2v-2c0-.552285.447715-1 1-1s1 .447715 1 1v2zm-5.364125-8H817v8h7.049375c.350333-3.528515 2.534789-6.517471 5.5865-8zm-5.5865 10H785c-3.313708 0-6-2.686292-6-6v-30c0-3.313708 2.686292-6 6-6h44c3.313708 0 6 2.686292 6 6v25.049375c5.053323.501725 9 4.765277 9 9.950625 0 5.522847-4.477153 10-10 10-5.185348 0-9.4489-3.946677-9.950625-9zM799 725h16v-8h-16v8zm0 2v8h16v-8h-16zm34-2v-8h-16v8h16zm-52 0h16v-8h-16v8zm0 2v4c0 2.209139 1.790861 4 4 4h12v-8h-16zm18-12h16v-8h-16v8zm34 0v-8h-16v8h16zm-52 0h16v-8h-16v8zm52-10v-4c0-2.209139-1.790861-4-4-4h-44c-2.209139 0-4 1.790861-4 4v4h52zm1 39c4.418278 0 8-3.581722 8-8s-3.581722-8-8-8-8 3.581722-8 8 3.581722 8 8 8z"></path></g></g></svg>
                                    <h3 class="text-base text-80 font-normal mb-6">
                                        No page settings matched the given criteria.
                                    </h3>
                                    <router-link
                                        tag="a"
                                        :to="{name: 'laravel-nova-governor-groups-create'}"
                                        class="btn btn-sm btn-outline inline-flex items-center"
                                        dusk="create-button"
                                    >
                                        Create Group
                                    </router-link>
                                </div>
                            </div>
                        </tr>
                        <tr
                            v-for="group in groups"
                            :key="group.name"
                            :class="{'disabled': group.name == 'SuperAdmin'}"
                            class="cursor-pointer font-normal dim text-white mb-6 text-base no-underline"
                        >
                            <td>
                                <span class="whitespace-no-wrap text-left">
                                    {{ group.name }}
                                </span>
                            </td>
                            <td>
                                <span class="whitespace-no-wrap text-left">
                                    {{ entityNames(group) }}
                                </span>
                            </td>
                            <td>
                                <span>
                                    <router-link
                                        tag="a"
                                        :to="{name: 'laravel-nova-governor-groups-edit', params: {groupName: group.name}}"
                                        class="cursor-pointer text-70 hover:text-primary mr-3"
                                        title="Edit"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-labelledby="edit" role="presentation" class="fill-current"><path d="M4.3 10.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM6 14h2.59l9-9L15 2.41l-9 9V14zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h6a1 1 0 1 1 0 2H2v14h14v-6z"></path></svg>
                                    </router-link>
                                </span>
                                <button
                                    title="Delete"
                                    class="appearance-none cursor-pointer text-70 hover:text-primary mr-3"
                                    type="button"
                                    @click="showDeleteModalFor(group)"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-labelledby="delete" role="presentation" class="fill-current"><path fill-rule="nonzero" d="M6 4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1a1 1 0 1 1 0-2h5zM4 6v12h12V6H4zm8-2V2H8v2h4zM8 8a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z"></path></svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </loading-card>
        <portal to="modals">
            <modal
                v-if="isDeleteModalVisible"
                @modal-close="hideDeleteModal"
            >
                <div class="bg-white rounded-lg shadow-lg overflow-hidden" style="width: 460px;">
                    <div class="p-8">
                        <h2 class="mb-6 text-90 font-normal text-xl">Delete Resource</h2>
                        <p class="text-80 leading-normal">
                            Are you sure you want to delete this resource?
                        </p>
                    </div>
                    <div class="bg-30 px-6 py-3 flex">
                        <div class="ml-auto">
                            <button
                                type="button"
                                class="btn text-80 font-normal h-9 px-3 mr-3 btn-link"
                                @click="hideDeleteModal"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                class="btn btn-default btn-danger"
                                @click="deleteGroup"
                                :disabled="isDeleting"
                            >
                                <i
                                    class="fas fa-circle-notch fa-spin"
                                    v-show="isDeleting"
                                ></i>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </modal>
        </portal>
    </div>
</template>

<style scoped lang="scss">
    tr.disabled {
        pointer-events: none;
    }
</style>
