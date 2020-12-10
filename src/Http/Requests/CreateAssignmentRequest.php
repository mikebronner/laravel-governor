<?php namespace GeneaLabs\LaravelGovernor\Http\Requests;

use Illuminate\Foundation\Http\FormRequest as Request;

class CreateAssignmentRequest extends Request
{
    public function authorize(): bool
    {
        $assignmentClass = config("genealabs-laravel-governor.models.assignment");

        return app('Illuminate\Contracts\Auth\Access\Gate')
            ->allows('create', new $assignmentClass);
    }

    public function rules(): array
    {
        return [
            'users' => 'required|array',
        ];
    }

    public function process(): void
    {
        $assignmentClass = config("genealabs-laravel-governor.models.assignment");
        $assignment = new $assignmentClass;
        $assignment->removeAllUsersFromRoles();
        $assignment->assignUsersToRoles($this->users);
        $assignment->addAllUsersToMemberRole();
        $assignment->removeAllSuperAdminUsersFromOtherRoles($this->users);
    }
}
