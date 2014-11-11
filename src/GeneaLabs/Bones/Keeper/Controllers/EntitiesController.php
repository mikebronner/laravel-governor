<?php namespace GeneaLabs\Bones\Keeper\Controllers;

use GeneaLabs\Bones\Marshal\BonesMarshalBaseController;
use GeneaLabs\Bones\Marshal\Commands\CommandBus;
use GeneaLabs\Bones\Keeper\Entities\Commands\AddEntityCommand;
use GeneaLabs\Bones\Keeper\Entities\Commands\ModifyEntityCommand;
use GeneaLabs\Bones\Keeper\Entities\Commands\RemoveEntityCommand;
use GeneaLabs\Bones\Keeper\Entities\Entity;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\View;

/**
 * Class EntitiesController
 * @package GeneaLabs\Bones\Keeper\Controllers
 */
class EntitiesController extends BonesMarshalBaseController
{

    public function __construct(CommandBus $commandBus)
    {
        parent::__construct($commandBus);
        $this->beforeFilter('auth');
        $this->beforeFilter('csrf', ['on' => 'post']);
    }

    /**
     * @return mixed
     */
    public function index()
    {
        $entities = Entity::groupBy('name')->get();

        return View::make('bones-keeper::entities.index', compact('entities'));
    }

    /**
     * @return mixed
     */
    public function create()
    {
        return View::make('bones-keeper::entities.create');
    }

    /**
     * @return mixed
     */
    public function store()
    {
        $command = new AddEntityCommand(Input::only('name'));
        $this->execute($command);

        return Redirect::route('entities.index');
    }

    /**
     * @param $name
     * @return mixed
     */
    public function edit($name)
    {
        $entity = Entity::find($name);

        return View::make('bones-keeper::entities.edit', compact('entity'));
    }

    /**
     * @param $name
     * @return mixed
     */
    public function update($name)
    {
        $command = new ModifyEntityCommand($name, Input::all());
        $this->execute($command);

        return Redirect::route('entities.index');
    }

    /**
     * @param $name
     * @return mixed
     */
    public function destroy($name)
    {
        $command = new RemoveEntityCommand($name);
        $this->execute($command);

        return Redirect::route('entities.index');
    }
}
