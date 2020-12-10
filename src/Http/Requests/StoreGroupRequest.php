<?php

namespace GeneaLabs\LaravelGovernor\Http\Requests;

use Illuminate\Foundation\Http\FormRequest as Request;

class StoreGroupRequest extends Request
{
    public function authorize(): bool
    {
        $groupClass = config("genealabs-laravel-governor.models.group");

        return auth()->check()
            && ($this->group
                ? auth()->user()->can("update", $this->group)
                : auth()->user()->can("create", $groupClass));
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string',
            "entity_names" => "required|array",
        ];
    }

    public function process()
    {
        $entityClass = config("genealabs-laravel-governor.models.entity");
        $groupClass = config("genealabs-laravel-governor.models.group");

        (new $groupClass)->firstOrCreate([
            "name" => $this->name,
        ]);

        foreach ($this->entity_names as $entityName) {
            (new $entityClass)
                ->where("name", $entityName)
                ->update([
                    "group_name" => $this->name,
                ]);
        }
    }
}
