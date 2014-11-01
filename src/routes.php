<?php
use \Illuminate\Support\Facades\Route;

Route::resource('roles', 'GeneaLabs\Bones\Keeper\Controllers\RolesController');
Route::resource('permissions', 'GeneaLabs\Bones\Keeper\Controllers\PermissionsController');
