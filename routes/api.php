<?php

Route::get('user-can/{ability}', "UserCan@show")
    ->name("genealabs.laravel-governor.api.user-can.show");
Route::get('user-is/{role}', "UserIs@show")
    ->name("genealabs.laravel-governor.api.user-is.show");
