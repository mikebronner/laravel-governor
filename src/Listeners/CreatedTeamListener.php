<?php namespace GeneaLabs\LaravelGovernor\Listeners;

class CreatedTeamListener
{
    public function handle($team)
    {
        auth()->user()->teams()->save($team);
    }
}
