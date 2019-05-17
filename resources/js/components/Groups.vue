<script>
    module.exports = {
        data: function () {
            return {
                isLoading: true,
                groups: [],
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
            entityNames: function (group) {
                return _.chain(group.entities)
                    .map(function (entity) {
                        return entity.name;
                    })
                    .reduce(function (carry, name) {
                        return carry + ", " + name;
                    });
            },

            loadGroups: function () {
                var self = this;

                axios.get("/genealabs/laravel-governor/nova/groups")
                    .then(function (response) {
                        self.groups = Object.assign([], response.data);
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
                        <router-link
                            v-for="group in groups"
                            :key="group.name"
                            tag="tr"
                            :to="{name: 'laravel-nova-governor-group-edit', params: {group: group.name} }"
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
