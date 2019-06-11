<?php

Route::resource('roles', "RolesController")
    ->except(['show']);
Route::resource('assignments', "AssignmentsController")
    ->only(['edit', 'update']);
Route::resource("invitations", "InvitationController")
    ->only(["show", "update"]);
