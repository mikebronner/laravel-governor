<?php namespace GeneaLabs\Bones\Keeper\Controllers;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\View;

class RolesController extends \BaseController
{
    public function index()
    {
        $layoutView = Config::get('genealabs/bones-keeper::config.layoutView');

        return View::make('genealabs/bones-keeper::roles.index', compact('layoutView'));
    }
}
