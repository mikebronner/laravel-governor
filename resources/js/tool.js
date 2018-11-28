Nova.booting((Vue, router) => {
    router.addRoutes([
        {
            name: 'laravel-nova-governor',
            path: '/laravel-nova-governor',
            component: require('./components/Tool'),
        },
    ])
})
