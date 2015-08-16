<?php namespace GeneaLabs\Bones\Keeper\Controllers;

use Illuminate\Routing\Controller;

class ErrorsController extends Controller
{
    public function invalid()
    {
        return view('genealabs-bones-keeper::errors.unauthorized');
    }

    public function modelValidation()
    {
        return view('genealabs-bones-keeper::errors.modelValidation');
    }
}
