<?php namespace GeneaLabs\LaravelGovernor;

use GeneaLabs\LaravelGovernor\Traits\Governable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TeamInvitation extends Model
{
    use Governable;

    protected $fillable = [
        "email",
        "team_id",
        "token",
    ];
    protected $table = "governor_team_invitations";

    public function team() : BelongsTo
    {
        return $this->belongsTo(
            config('genealabs-laravel-governor.models.team')
        );
    }
}
