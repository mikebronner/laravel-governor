<?php namespace GeneaLabs\LaravelGovernor\Http\Requests;

use Illuminate\Foundation\Http\FormRequest as Request;

class UserIs extends Request
{
    public function authorize() : bool
    {
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
