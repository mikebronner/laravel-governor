<?php
use \Illuminate\Support\Facades\Route;

Route::resource('roles', 'GeneaLabs\Bones\Keeper\Controllers\RolesController');
Route::resource('entities', 'GeneaLabs\Bones\Keeper\Controllers\EntitiesController');
