<?php namespace GeneaLabs\LaravelGovernor\Http\Controllers;

use GeneaLabs\LaravelGovernor\Entity;
use GeneaLabs\LaravelGovernor\Http\Requests\CreateEntityRequest;
use GeneaLabs\LaravelGovernor\Http\Requests\DestroyEntityRequest;
use GeneaLabs\LaravelGovernor\Http\Requests\UpdateEntityRequest;

class EntitiesController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * @return mixed
     */
    public function index()
    {
        $this->authorize('view', (new Entity()));
        $entities = Entity::groupBy('name')->get();

        return view('genealabs-bones-keeper::entities.index', compact('entities'));
    }

    /**
     * @return mixed
     */
    public function create()
    {
        $entity = new Entity();
        $this->authorize('create', $entity);

        return view('genealabs-bones-keeper::entities.create', compact('entity'));
    }

    /**
     * @return mixed
     */
    public function store(CreateEntityRequest $request)
    {
        Entity::create($request->only('name'));
        $this->resetSuperAdminPermissions();

        return redirect()->route('entities.index');
    }

    /**
     * @param $name
     * @return mixed
     */
    public function edit($name)
    {
        $entity = Entity::find($name);
        $this->authorize($entity);

        return view('genealabs-bones-keeper::entities.edit', compact('entity'));
    }

    /**
     * @param $name
     * @return mixed
     */
    public function update(UpdateEntityRequest $request, $name)
    {
        $entity = Entity::find($name);
        $entity->fill($request->only('name'));
        $entity->save();
        $this->resetSuperAdminPermissions();

        return redirect()->route('entities.index');
    }

    /**
     * @param $name
     * @return mixed
     */
    public function destroy($name)
    {
        $entity = Entity::find($name);
        $this->authorize('remove', $entity);
        $entity->destroy();
        $this->resetSuperAdminPermissions();

        return redirect()->route('entities.index');
    }
}
