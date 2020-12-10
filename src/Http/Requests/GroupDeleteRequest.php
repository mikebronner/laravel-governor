<?php

namespace GeneaLabs\LaravelGovernor\Http\Requests;

use GeneaLabs\LaravelGovernor\Group;
use Illuminate\Foundation\Http\FormRequest as Request;

class GroupDeleteRequest extends Request
{
    public function authorize(): bool
    {
        $groupClass = config("genealabs-laravel-governor.models.group");

        return auth()->check()
            && auth()->user()->can("delete", $this->group);
    }

    public function rules(): array
    {
        return [
            //
        ];
    }

    public function process(): Group
    {
        $this->group->delete();

        return $this->group;
    }
}
