<?php namespace GeneaLabs\LaravelGovernor\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use GeneaLabs\LaravelGovernor\TeamInvitation as Invitation;

class TeamInvitation extends Notification
{
    use Queueable;

    protected $invitation;

    public function __construct(Invitation $invitation)
    {
        $this->invitation = $invitation;
    }

    public function via($notifiable) : array
    {
        return ['mail'];
    }

    public function toMail($notifiable) : MailMessage
    {
        $appUrl = config("app.url");
        $message = [
            "You have been invited by {$this->invitation->ownedBy->name}",
            "to join team '{$this->invitation->team->name}' on {$appUrl}."
        ];
        $route = route(
            "genealabs.laravel-governor.invitations.update",
            $this->invitation->token
        );

        return (new MailMessage)
            ->greeting("Hello!")
            ->line(implode(" ", $message))
            ->action('Accept Invitation', url($route));
    }

    public function toArray($notifiable) : array
    {
        return [
            //
        ];
    }
}
