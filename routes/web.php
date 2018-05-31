<?php

Route::resource('roles', "RolesController")
    ->except(['show']);
Route::resource('assignments', "AssignmentsController")
    ->only(['edit', 'update']);
