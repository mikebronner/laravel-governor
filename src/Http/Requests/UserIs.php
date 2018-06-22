<?php namespace GeneaLabs\LaravelGovernor\Http\Requests;

use Illuminate\Contracts\Auth\Access\Gate;
use Illuminate\Foundation\Http\FormRequest as Request;

class UserIs extends Request
{
    public function authorize() : bool
    {
        auth()->user()->load("roles");

        return auth()->check()
            && (auth()->user()->roles->contains($this->role)
                || auth()->user()->roles->contains("SuperAdmin"));
    }

    public function rules() : array
    {
        return [
            //
        ];
    }
}
