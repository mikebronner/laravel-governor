<?php

declare(strict_types=1);

namespace GeneaLabs\LaravelGovernor\Relations;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use LogicException;

class TeamMembersRelation extends BelongsToMany
{
    public function detach($ids = null, $touch = true)
    {
        $team = $this->getParent();

        // Resolve the owner fresh: drop any eager-loaded governorOwner so the
        // dual-source accessor re-reads the authoritative polymorphic record
        // (falling back to the deprecated column). Without this, a stale
        // in-memory owner held across an out-of-band transferOwnership() could
        // let a former owner be detached, or wrongly block the current one.
        $team->unsetRelation('governorOwner');
        $ownerId = (int) $team->governor_owned_by;

        if ($ownerId === 0) {
            return parent::detach($ids, $touch);
        }

        if ($ids === null) {
            if ($this->newPivotQuery()->where('user_id', $ownerId)->exists()) {
                throw new LogicException(
                    "The team owner cannot be removed from their own team."
                );
            }
        } else {
            $ids = $this->parseIds($ids);

            foreach ($ids as $id) {
                if ((int) $id === $ownerId) {
                    throw new LogicException(
                        "The team owner cannot be removed from their own team."
                    );
                }
            }
        }

        return parent::detach($ids, $touch);
    }
}
