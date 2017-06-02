<?php

return [
    'layoutView' => 'layouts.app',
    'contentSection' => 'content',
    'displayNameField' => 'name',
    'auth-model' => config('auth.model') ?? config('auth.providers.users.model'),
    'url-prefix' => '/genealabs/laravel-governor/',
];
