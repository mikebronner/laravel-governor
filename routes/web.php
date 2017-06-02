<?php

use \GeneaLabs\LaravelGovernor\Http\Controllers\AssignmentsController;
use \GeneaLabs\LaravelGovernor\Http\Controllers\RolesController;
use \Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['web'], 'as' => 'genealabs.laravel-governor.'], function () {
    Route::resource(
        config('genealabs-laravel-governor.url-prefix') . 'roles',
        RolesController::class,
        ['except' => ['show']]
    );
    Route::resource(
        config('genealabs-laravel-governor.url-prefix') . 'assignments',
        AssignmentsController::class,
        ['only' => ['index', 'store']]
    );
});
