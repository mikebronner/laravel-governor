<?php namespace GeneaLabs\LaravelGovernor\Http\Requests;

use Illuminate\Foundation\Http\FormRequest as Request;

class UpdateTeamRequest extends Request
{
    public function authorize() : bool
    {
        $teamClass = config("genealabs-laravel-governor.models.team");
        $this->team = (new $teamClass)
            ->find($this->team);

        return auth()->check()
            && ($this->team
                ? auth()->user()->can("update", $this->team)
                : auth()->user()->can("create", $roleClass));
    }

    public function rules() : array
    {
        return [
            "permissions" => "array",
        ];
    }

    public function process()
    {
        $permissionClass = config("genealabs-laravel-governor.models.permission");
\Log::debug([$this->team->id]);
        if ($this->filled('permissions')) {
            $this->team->permissions()->delete();

            // TODO: optimize into a single insert command
            foreach ($this->permissions as $group) {
                foreach ($group as $entity => $actions) {
                    foreach ($actions as $action => $ownership) {
                        if ('no' !== $ownership) {
                            $currentPermission = (new $permissionClass)
                                ->firstOrNew([
                                    "action_name" => $action,
                                    "entity_name" => $entity,
                                    "team_id" => $this->team->id,
                                ]);
                            $currentPermission->ownership_name = $ownership;
                            $currentPermission->save();
                        }
                    }
                }
            }
        }
    }
}
