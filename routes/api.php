<?php

Route::get('user-can/{ability}', "UserCan@show")
    ->name("genealabs.laravel-governor.api.user-can.show");
