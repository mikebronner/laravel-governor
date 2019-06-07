<?php namespace GeneaLabs\LaravelGovernor\Listeners;

use GeneaLabs\LaravelGovernor\Notifications\TeamInvitation;
use GeneaLabs\LaravelGovernor\TeamInvitation as GeneaLabsTeamInvitation;
use Illuminate\Support\Facades\Notification;

class CreatedInvitationListener
{
    /**
     * @SuppressWarnings(PHPMD.UnusedFormalParameter)
     * @SuppressWarnings(PHPMD.StaticAccess)
     */
    public function handle(GeneaLabsTeamInvitation $invitation)
    {
        Notification::route('mail', $invitation->email)
            ->notify(new TeamInvitation($invitation));
    }
}
