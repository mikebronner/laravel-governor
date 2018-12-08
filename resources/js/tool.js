Nova.booting((Vue, router) => {
    Vue.component("multiselect", require("vue-multiselect").default);
    router.addRoutes([
        {
            name: 'laravel-nova-governor-roles',
            path: '/laravel-nova-governor/roles',
            component: require('./components/Roles'),
        },
        {
            name: 'laravel-nova-governor-role-create',
            path: '/laravel-nova-governor/roles/create',
            component: require('./components/RoleCreate'),
        },
        {
            name: 'laravel-nova-governor-permissions',
            path: '/laravel-nova-governor/permissions/:role',
            component: require('./components/Permissions'),
        },
        {
            name: 'laravel-nova-governor-assignments',
            path: '/laravel-nova-governor/assignments',
            component: require('./components/Assignments'),
        },
    ])
})
