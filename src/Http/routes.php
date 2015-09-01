<?php

use GeneaLabs\LaravelGovernor\Http\Controllers\AssignmentsController;
use GeneaLabs\LaravelGovernor\Http\Controllers\EntitiesController;
use GeneaLabs\LaravelGovernor\Http\Controllers\RolesController;
use Illuminate\Support\Facades\Route;

Route::resource('roles', RolesController::class, ['except' => ['show']]);
Route::resource('entities', EntitiesController::class, ['except' => ['show']]);
Route::resource('assignments', AssignmentsController::class, ['only' => ['index', 'store']]);
