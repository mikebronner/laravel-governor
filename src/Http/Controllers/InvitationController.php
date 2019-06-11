<?php namespace GeneaLabs\LaravelGovernor\Http\Controllers;

class InvitationController extends Controller
{
    public function show(string $token)
    {
        $teamInvitationClass = config("genealabs-laravel-governor.models.invitation");
        $invitation = (new $teamInvitationClass)
            ->with("team")
            ->where("token", $token)
            ->first();

        if (! $invitation) {
            abort(410, "Unfortunately this invitation is no longer valid.");
        }

        $invitation->team->members()->syncWithoutDetaching(auth()->user());
        $invitation->delete();
        $nova = config("nova.path");

        return redirect("{$nova}/resources/teams/{$invitation->team_id}");
    }
}
