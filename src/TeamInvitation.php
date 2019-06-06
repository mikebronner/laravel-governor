<?php namespace GeneaLabs\LaravelGovernor;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TeamInvitations extends Model
{
    protected $fillable = [
        "email",
        "team_id",
        "token",
    ];

    public function team() : BelongsTo
    {
        return $this->belongsTo(Team::class);
    }
}
