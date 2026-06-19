<?php

declare(strict_types=1);

namespace GeneaLabs\LaravelGovernor\Http\Requests;

use Illuminate\Foundation\Http\FormRequest as Request;

class TransferTeamOwnershipRequest extends Request
{
    public function authorize(): bool
    {
        if (! auth()->check() || ! $this->team) {
            return false;
        }

        // Read the current owner fresh so a stale eager-loaded governorOwner
        // can't authorize (or wrongly deny) a transfer after an out-of-band
        // ownership change. The accessor re-reads the polymorphic record and
        // falls back to the deprecated column.
        $this->team->unsetRelation('governorOwner');

        return (int) $this->team->governor_owned_by === (int) auth()->id();
    }

    public function rules(): array
    {
        return [
            "new_owner_id" => [
                "required",
                "integer",
                function (string $attribute, mixed $value, \Closure $fail): void {
                    $authClass = config("genealabs-laravel-governor.models.auth");
                    $user = (new $authClass)->find($value);

                    if (! $user) {
                        $fail("The selected user does not exist.");

                        return;
                    }

                    $this->team->loadMissing('members');

                    if (! $this->team->members->contains($user->getKey())) {
                        $fail("The new owner must be an existing member of the team.");
                    }
                },
            ],
        ];
    }

    public function process(): void
    {
        $authClass = config("genealabs-laravel-governor.models.auth");
        $newOwner = (new $authClass)->findOrFail($this->input("new_owner_id"));

        $this->team->transferOwnership($newOwner);
    }
}
