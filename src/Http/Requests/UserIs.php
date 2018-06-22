<?php namespace GeneaLabs\LaravelGovernor\Http\Requests;

use Illuminate\Contracts\Auth\Access\Gate;
use Illuminate\Foundation\Http\FormRequest as Request;

class UserIs extends Request
{
    public function authorize() : bool
    {
        return true;
        auth()->user()->load("roles");

        return auth()->user()->roles->contains($this->role);
    }

    public function rules() : array
    {
        return [
            //
        ];
    }
}
