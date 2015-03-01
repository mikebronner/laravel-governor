<?php

use Illuminate\Support\Facades\Route;

Route::resource('roles', 'GeneaLabs\Bones\Keeper\Controllers\RolesController', ['except' => ['show']]);
Route::resource('entities', 'GeneaLabs\Bones\Keeper\Controllers\EntitiesController', ['except' => ['show']]);
Route::resource('assignments', 'GeneaLabs\Bones\Keeper\Controllers\AssignmentsController', ['only' => ['index', 'store']]);
Route::get('invalid', ['as' => 'invalid', 'uses' => 'GeneaLabs\Bones\Keeper\Controllers\ErrorsController@invalid']);
Route::get('modelValidationError', ['as' => 'modelValidation', 'uses' =>'GeneaLabs\Bones\Keeper\Controllers\ErrorsController@modelValidation']);

//Event::listen('GeneaLabs.Bones.Keeper.Entities.*', 'GeneaLabs\Bones\Keeper\Entities\EntityEventListener');
