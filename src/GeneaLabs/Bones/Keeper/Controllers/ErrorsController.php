<?php namespace GeneaLabs\Bones\Keeper\Controllers;

use Illuminate\Routing\Controller;

class ErrorsController extends Controller
{
    public function invalid()
    {
        return view('bones-keeper::errors.unauthorized');
    }

    public function modelValidation()
    {
        return view('bones-keeper::errors.modelValidation');
    }
}
