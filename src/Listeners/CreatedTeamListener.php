<?php namespace GeneaLabs\LaravelGovernor\Listeners;

class CreatedTeamListener
{
    public function handle($team)
    {
        $team->members()->syncWithoutDetaching([$team->governor_owned_by]);
    }
}
