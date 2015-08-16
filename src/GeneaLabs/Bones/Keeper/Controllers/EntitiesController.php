<?php namespace GeneaLabs\Bones\Keeper\Controllers;

use GeneaLabs\Bones\Keeper\BonesKeeperHelper;
use GeneaLabs\Bones\Keeper\Models\Entity;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\View;

/**
 * Class EntitiesController
 * @package GeneaLabs\Bones\Keeper\Controllers
 */
class EntitiesController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
//        $this->beforeFilter('csrf', ['on' => 'post']);
    }

    /**
     * @return mixed
     */
    public function index()
    {
        if (Auth::user()->hasAccessTo('view', 'any', 'entity')) {
            $entities = Entity::groupBy('name')->get();

            return view('genealabs-bones-keeper::entities.index', compact('entities'));
        }
    }

    /**
     * @return mixed
     */
    public function create()
    {
        if (Auth::user()->hasAccessTo('add', 'any', 'entity')) {
            return view('genealabs-bones-keeper::entities.create');
        }
    }

    /**
     * @return mixed
     */
    public function store()
    {
        if (Auth::user()->hasAccessTo('add', 'any', 'entity')) {
            Entity::create(Input::only('name'));
            BonesKeeperHelper::resetSuperAdminPermissions();

            return redirect()->route('entities.index');
        }
    }

    /**
     * @param $name
     * @return mixed
     */
    public function edit($name)
    {
        if (Auth::user()->hasAccessTo('change', 'any', 'entity')) {
            $entity = Entity::find($name);

            return view('genealabs-bones-keeper::entities.edit', compact('entity'));
        }
    }

    /**
     * @param $name
     * @return mixed
     */
    public function update($name)
    {
        if (Auth::user()->hasAccessTo('change', 'any', 'entity')) {
            $entity = Entity::find($name);
            $entity->fill(Input::only('name'));
            $entity->save();
            BonesKeeperHelper::resetSuperAdminPermissions();

            return redirect()->route('entities.index');
        }
    }

    /**
     * @param $name
     * @return mixed
     */
    public function destroy($name)
    {
        if (Auth::user()->hasAccessTo('remove', 'any', 'entity')) {
            Entity::destroy($name);
            BonesKeeperHelper::resetSuperAdminPermissions();

            return redirect()->route('entities.index');
        }
    }
}
