<?php namespace GeneaLabs\Bones\Keeper\Controllers;

use GeneaLabs\Bones\Keeper\Models\Assignment;
use GeneaLabs\Bones\Keeper\Models\Role;
use Illuminate\Routing\Controller;
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
class AssignmentsController extends Controller
{
    /**
     * @var
     */
    protected $user;
    /**
     * @var
     */
    protected $displayNameField;

    public function __construct()
    {
        $this->middleware('auth');
//        $this->beforeFilter('csrf', ['on' => 'post']);
        $this->displayNameField = Config::get('genealabs.bones-keeper.displayNameField');
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

            return view('bones-keeper::assignments.index',
                compact('users', 'roles', 'displayNameField', 'userList'));
        }
    }

    /**
     * @return mixed
     */
    public function store()
    {
        if (Auth::user()->hasAccessTo('change', 'any', 'assignment')) {
            $assignment = new Assignment();
            $assignment->removeAllUsersFromRoles();
            if (Input::has('users')) {
                $assignedUsers = Input::get('users');
                $assignment->assignUsersToRoles($assignedUsers);
                $assignment->addAllUsersToMemberRole();
                $assignment->removeAllSuperAdminUsersFromOtherRoles($assignedUsers);
            }
        }

        return redirect()->route('assignments.index');
    }
}
