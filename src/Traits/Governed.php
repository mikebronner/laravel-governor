<?php namespace GeneaLabs\LaravelGovernor\Traits;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait Governed
{
    public function createdBy() : BelongsTo
    {
        return $this->belongsTo(config("genealabs-laravel-governor.models.auth"));
    }
}
