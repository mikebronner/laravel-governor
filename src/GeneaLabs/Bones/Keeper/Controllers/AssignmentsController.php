<?php namespace GeneaLabs\Bones\Keeper\Controllers;

use GeneaLabs\Bones\Keeper\Assignments\Commands\AddAssignmentCommand;
use GeneaLabs\Bones\Keeper\BonesKeeperBaseController;
use GeneaLabs\Bones\Keeper\Roles\Role;
use GeneaLabs\Bones\Marshal\Commands\CommandBus;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\View;

/**
 * Class UserRolesController
 * @package GeneaLabs\Bones\Keeper\Controllers
 */
class AssignmentsController extends BonesKeeperBaseController
{
    /**
     * @var
     */
    protected $user;
    /**
     * @var
     */
    protected $displayNameField;

    public function __construct(CommandBus $commandBus)
    {
        parent::__construct($commandBus);
        $this->beforeFilter('auth');
        $this->beforeFilter('csrf', ['on' => 'post']);
        $this->displayNameField = Config::get('bones-keeper::displayNameField');
        $this->user = App::make(Config::get('auth.model'));
    }

    /**
     * @return mixed
     */
    public function index()
    {
        if (Auth::user()->hasAccessTo('view', 'any', 'assignment')) {
            $displayNameField = $this->displayNameField;
            $users = $this->user->all();
            $roles = Role::with('users')->get();

            return View::make('bones-keeper::assignments.index',
                compact('users', 'roles', 'displayNameField', 'userList'));
        }
    }

    /**
     * @return mixed
     */
    public function store()
    {
        if (Auth::user()->hasAccessTo('edit', 'any', 'assignment')) {
            $command = new AddAssignmentCommand(Input::all());
            $this->execute($command);

            return Redirect::route('assignments.index');
        }
    }
}
