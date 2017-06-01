<?php namespace GeneaLabs\LaravelGovernor\Http\Controllers;

use GeneaLabs\LaravelGovernor\Assignment;
use GeneaLabs\LaravelGovernor\Http\Requests\CreateAssignmentRequest;
use GeneaLabs\LaravelGovernor\Role;

class AssignmentsController extends Controller
{
    protected $user;
    protected $displayNameField;

    public function __construct()
    {
        $this->middleware('auth');
        $this->displayNameField = config('genealabs-laravel-governor.displayNameField');
        $this->user = app(config('genealabs-laravel-governor.authModel'));
    }

    /**
     * @return mixed
     */
    public function index()
    {
        $assignment = new Assignment();
        $this->authorize('view', $assignment);
        $displayNameField = $this->displayNameField;
        $users = $this->user->all();
        $roles = Role::with('users')->get();

        return view('genealabs-laravel-governor::assignments.index',
            compact('users', 'roles', 'displayNameField', 'userList', 'assignment'));
    }

    /**
     * @return mixed
     */
    public function store(CreateAssignmentRequest $request)
    {
        $assignment = new Assignment();
        $assignment->removeAllUsersFromRoles();
        $assignedUsers = $request->get('users');
        $assignment->assignUsersToRoles($assignedUsers);
        $assignment->addAllUsersToMemberRole();
        $assignment->removeAllSuperAdminUsersFromOtherRoles($assignedUsers);

        return redirect()->route('genealabs.laravel-governor.assignments.index');
    }
}
