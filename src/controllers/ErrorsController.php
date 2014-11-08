<?php namespace GeneaLabs\Bones\Keeper\Controllers;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\View;

class ErrorsController extends \BaseController
{
    public function invalid()
    {
        return View::make('bones-keeper::errors.unauthorized');
    }
}
