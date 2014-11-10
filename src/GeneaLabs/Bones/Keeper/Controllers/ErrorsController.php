<?php namespace GeneaLabs\Bones\Keeper\Controllers;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\View;

/**
 * Class ErrorsController
 * @package GeneaLabs\Bones\Keeper\Controllers
 */
class ErrorsController extends \BaseController
{
    /**
     * @return mixed
     */
    public function invalid()
    {
        return View::make('bones-keeper::errors.unauthorized');
    }

    public function modelValidation()
    {
        return View::make('bones-keeper::errors.modelValidation');
    }
}
