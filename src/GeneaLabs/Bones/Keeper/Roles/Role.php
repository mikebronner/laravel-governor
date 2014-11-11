<?php namespace GeneaLabs\Bones\Keeper\Roles;

use GeneaLabs\Bones\Keeper\Roles\Events\RoleWasAddedEvent;
use GeneaLabs\Bones\Keeper\Roles\Events\RoleWasModifiedEvent;
use GeneaLabs\Bones\Keeper\Roles\Events\RoleWasRemovedEvent;
use GeneaLabs\Bones\Marshal\BonesMarshalBaseModel;

/**
 * Class Role
 * @package GeneaLabs\Bones\Keeper\Models
 */
class Role extends BonesMarshalBaseModel
{
    /**
     * @var string
     */
    protected $primaryKey = 'name';
    /**
     * @var array
     */
    protected $rules = [
        'name' => 'required|min:3|unique:roles,name',
        'description' => 'required|min:25',
	];

    /**
     * @var array
     */
    protected $fillable = [
		'name',
		'description',
	];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users()
	{
		return $this->belongsToMany(\Config::get('auth.model'), 'role_user', 'role_key', 'user_id');
	}

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function permissions()
	{
		return $this->hasMany('GeneaLabs\Bones\Keeper\Models\Permission', 'role_key');
	}

    /**
     * @param $command
     * @return $this
     */
    public static function add($command)
    {
        static::create([
            'name' => $command->name,
            'description' => $command->description,
        ]);
        $role = static::find($command->name);
        $role->raise(new RoleWasAddedEvent($role));

        return $role;
    }

    /**
     * @param $command
     * @return $this
     */
    public static function modify($command)
    {
        $role = static::find($command->name);
        if ($role && isset($command->data)) {
            $role->name = $command->data['name'];
            $role->description = $command->data['description'];
            $role->save();
            $role->raise(new RoleWasModifiedEvent($role));
        }

        return $role;
    }

    public static function remove($command)
    {
        $isSuccessful = false;
        $role = static::find($command->name);
        if ($role) {
            $role->delete();
            $role->raise(new RoleWasRemovedEvent($role));
            $isSuccessful = true;
        }

        return $isSuccessful;
    }
}
