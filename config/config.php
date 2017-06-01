<?php

return [
    'layoutView' => 'layouts.app',
    'contentSection' => 'content',
    'displayNameField' => 'name',
    'authModel' => config('auth.model') ?? config('auth.providers.users.model'),
];
