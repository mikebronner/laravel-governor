global._ = require('lodash');

Nova.booting((Vue, router) => {
    Vue.component("multiselect", require("vue-multiselect").default);
    router.addRoutes([
        {
            name: 'laravel-nova-governor-roles',
            path: '/laravel-nova-governor/roles',
            component: require('./components/Roles').default,
        },
        {
            name: 'laravel-nova-governor-role-create',
            path: '/laravel-nova-governor/roles/create',
            component: require('./components/RoleCreate').default,
        },
        {
            name: 'laravel-nova-governor-permissions',
            path: '/laravel-nova-governor/permissions/:role',
            component: require('./components/Permissions').default,
        },
        {
            name: 'laravel-nova-governor-groups',
            path: '/laravel-nova-governor/groups',
            component: require('./components/Groups').default,
        },
        {
            name: 'laravel-nova-governor-groups-create',
            path: '/laravel-nova-governor/groups/create',
            component: require('./components/GroupCreate').default,
        },
        {
            name: 'laravel-nova-governor-assignments',
            path: '/laravel-nova-governor/assignments',
            component: require('./components/Assignments').default,
        },
    ])
})
