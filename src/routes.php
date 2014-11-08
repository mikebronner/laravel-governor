<?php

use Illuminate\Support\Facades\Route;

Route::resource('roles', 'GeneaLabs\Bones\Keeper\Controllers\RolesController', ['except' => ['show']]);
Route::resource('entities', 'GeneaLabs\Bones\Keeper\Controllers\EntitiesController', ['except' => ['show']]);
Route::resource('userroles', 'GeneaLabs\Bones\Keeper\Controllers\UserRolesController', ['only' => ['index', 'store']]);
Route::get('invalid', ['as' => 'invalid', 'uses' => 'GeneaLabs\Bones\Keeper\Controllers\ErrorsController@invalid']);
