<?php namespace GeneaLabs\LaravelGovernor\Http\Requests;

use Illuminate\Contracts\Auth\Access\Gate;
use Illuminate\Foundation\Http\FormRequest as Request;

class UserCan extends Request
{
    public function authorize() : bool
    {
        $ability = request("ability");
        $model = request("model");
        $primaryKey = request("primary-key");

        if ($primaryKey) {
            $model = (new $model)->findOrFail($primaryKey);
        }

        auth()->user()->load("roles");
// dump("test",auth()->check(), auth()->user()->can($ability, $model), $ability, $model, auth()->user());
        return auth()->check()
            && auth()->user()->can($ability, $model);
    }

    public function rules() : array
    {
        return [
            // 'ability' => 'required|string',
            'model' => 'required|string',
            'primary-key' => 'integer',
        ];
    }
}
