<?php

declare(strict_types=1);

namespace GeneaLabs\LaravelGovernor;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Group extends Model
{
    protected $keyType = 'string';
    protected $primaryKey = 'name';
    protected $rules = [
        'name' => 'required|min:3|unique:governor_groups,name',
    ];
    protected $fillable = [
        'name',
    ];
    protected $table = "governor_groups";

    public $incrementing = false;

    public function entities() : HasMany
    {
        return $this->hasMany(
            config('genealabs-laravel-governor.models.entity'),
            'group_name'
        );
    }
}
