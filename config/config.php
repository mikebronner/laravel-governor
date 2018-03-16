<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Layout Blade File
    |--------------------------------------------------------------------------
    |
    | This value is used to reference your main layout blade view to render
    | the views provided by this package. The layout view referenced here
    | should include Bootstrap 3 and FontAwesome 4 to work as intended.
    */
    'layout-view' => 'layouts.app',

    /*
    |--------------------------------------------------------------------------
    | Layout Content Section Name
    |--------------------------------------------------------------------------
    |
    | Specify the name of the section in the view referenced above that is
    | used to render the main page content. If this does not match, you
    | will only get blank pages when accessing views in Governor.
    */
    'content-section' => 'content',

    /*
    |--------------------------------------------------------------------------
    | Authorization Model
    |--------------------------------------------------------------------------
    |
    | Here you can customize what model should be used for authorization checks
    | in the event that you have customized your authentication processes.
    */
    'auth-model' => config('auth.providers.users.model') ?? config('auth.model'),

    /*
    |--------------------------------------------------------------------------
    | User Model Name Property
    |--------------------------------------------------------------------------
    |
    | This value is used to display your users when assigning them to roles.
    | You can choose any property of your auth-model defined above that is
    | exposed via JSON.
    */
    'user-name-property' => 'name',

    /*
    |--------------------------------------------------------------------------
    | URL Prefix
    |--------------------------------------------------------------------------
    |
    | If you want to change the URL used by the browser to access the admin
    | pages, you can do so here. Be careful to avoid collisions with any
    | existing URLs of your app when doing so.
    */
    'url-prefix' => '/genealabs/laravel-governor/',

    /*
    |--------------------------------------------------------------------------
    | Framework
    |--------------------------------------------------------------------------
    |
    | Specify the framework that should be implemented. Possible options are:
    | bootstrap3, bootstrap4, vanilla (use this is none of the other frameworks
    | apply).
    */
    'framework' => 'bootstrap4',
];
