<?php namespace GeneaLabs\LaravelGovernor\Http\Requests;

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

        return auth()->check()
            && auth()->user()->can($ability, $model);
    }

    public function rules() : array
    {
        return [
            'model' => 'required|string',
            'primary-key' => 'integer',
        ];
    }
}
