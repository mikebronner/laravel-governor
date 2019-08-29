<?php namespace GeneaLabs\LaravelGovernor\Http\Controllers;

use GeneaLabs\LaravelGovernor\Http\Requests\CreateAssignmentRequest;
use GeneaLabs\LaravelGovernor\Role;
use GeneaLabs\LaravelGovernor\User;

class AssignmentsController extends Controller
{
    protected $displayNameField;

    public function __construct()
    {
        parent::__construct();

        $this->displayNameField = config('genealabs-laravel-governor.user-name-property');
    }

    /**
     * @return mixed
     */
    public function edit()
    {
        $assignmentClass = config("genealabs-laravel-governor.models.assignment");
        $userClass = app(config('genealabs-laravel-governor.models.auth'));
        $assignment = new $assignmentClass;
        $this->authorize('view', $assignment);
        $displayNameField = $this->displayNameField;
        $users = (new $userClass)
            ->getCached();
        $roles = (new Role)
            ->getCached();

        return view('genealabs-laravel-governor::assignments.edit')->with(
            compact('users', 'roles', 'displayNameField', 'assignment')
        );
    }

    /**
     * @return mixed
     */
    public function update(CreateAssignmentRequest $request)
    {
        $actionClass = config("genealabs-laravel-governor.models.action");
        $assignment = new $actionClass;
        $assignment->removeAllUsersFromRoles();
        $assignedUsers = $request->get('users');
        $assignment->assignUsersToRoles($assignedUsers);
        $assignment->addAllUsersToMemberRole();
        $assignment->removeAllSuperAdminUsersFromOtherRoles($assignedUsers);

        return redirect()
            ->route('genealabs.laravel-governor.assignments.edit', 0);
    }
}
