<?php namespace GeneaLabs\LaravelGovernor\Listeners;

use Ramsey\Uuid\Uuid;

class CreatingInvitationListener
{
    /**
     * @SuppressWarnings(PHPMD.StaticAccess)
     */
    public function handle($model)
    {
        $model->token = Uuid::uuid4();
        $model->ownedBy()->associate(auth()->user());
    }
}
