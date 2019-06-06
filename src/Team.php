<?php namespace GeneaLabs\LaravelGovernor;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Team extends Model
{
    protected $rules = [
        'name' => 'required|min:3',
        'description' => 'string',
    ];
    protected $fillable = [
        'name',
        'description',
    ];
    protected $table = "governor_teams";

    public function members() : BelongsToMany
    {
        return $this->belongsToMany(
            config('genealabs-laravel-governor.models.entity'),
            "governor_team_user",
            "team_id",
            "user_id"
        );
    }

    public function invitations() : HasMany
    {
        return $this->hasMany(TeamInvitation::class);
    }
}
