<?php namespace GeneaLabs\LaravelGovernor;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Permission
 * @package GeneaLabs\LaravelGovernor\Models
 */
class Permission extends Model
{
    /**
     * @var array
     */
    protected $rules = [
        'role_key' => 'required',
        'entity_key' => 'required',
        'action_key' => 'required',
        'ownership_key' => 'required',
    ];

    /**
     * @var array
     */
    protected $fillable = [
        'role_key',
        'entity_key',
        'action_key',
        'ownership_key',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function role()
	{
		return $this->belongsTo(Role::class, 'role_key', 'name');
	}

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function entity()
    {
        return $this->belongsTo(Entity::class, 'entity_key', 'name');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function action()
    {
        return $this->belongsTo(Action::class, 'action_key', 'name');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function ownership()
    {
        return $this->belongsTo(Ownership::class, 'ownership_key', 'name');
    }
}
