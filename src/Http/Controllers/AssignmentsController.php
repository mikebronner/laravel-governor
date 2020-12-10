<?php namespace GeneaLabs\LaravelGovernor\Http\Controllers;

use GeneaLabs\LaravelGovernor\Http\Requests\CreateAssignmentRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class AssignmentsController extends Controller
{
    protected $displayNameField;

    public function __construct()
    {
        parent::__construct();

        $this->displayNameField = config('genealabs-laravel-governor.user-name-property');
    }

    public function create(): View
    {
        $assignmentClass = config("genealabs-laravel-governor.models.assignment");
        $assignment = new $assignmentClass;
        $this->authorize('view', $assignment);
        $displayNameField = $this->displayNameField;
        $userClass = app(config('genealabs-laravel-governor.models.auth'));
        $users = (new $userClass)
            ->orderBy("name")
            ->get();
        $roleClass = config("genealabs-laravel-governor.models.role");
        $roles = (new $roleClass)
            ->with("users")
            ->orderBy("name")
            ->get();

        return view('genealabs-laravel-governor::assignments.create')->with(
            compact('users', 'roles', 'displayNameField', 'assignment')
        );
    }

    public function store(CreateAssignmentRequest $request): RedirectResponse
    {
        $request->process();

        return redirect()
            ->route('genealabs.laravel-governor.assignments.create');
    }
}
