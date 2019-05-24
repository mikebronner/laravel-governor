<?php namespace GeneaLabs\LaravelGovernor;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Owner extends Model
{
    protected $fillable = [
        'created_by',
    ];

    public function ownable() : MorphTo
    {
        return $this->morphTo();
    }
}
