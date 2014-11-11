<?php namespace GeneaLabs\Bones\Keeper\Entities;

use GeneaLabs\Bones\Keeper\Entities\Events\EntityWasAddedEvent;
use GeneaLabs\Bones\Keeper\Entities\Events\EntityWasModifiedEvent;
use GeneaLabs\Bones\Keeper\Entities\Events\EntityWasNotModifiedEvent;
use GeneaLabs\Bones\Keeper\Entities\Events\EntityWasRemovedEvent;
use GeneaLabs\Bones\Marshal\BonesMarshalBaseModel;

/**
 * Class Entity
 * @package GeneaLabs\Bones\Keeper\Entities
 */
class Entity extends BonesMarshalBaseModel
{
    /**
     * @var string
     */
    protected $primaryKey = 'name';
    /**
     * @var array
     */
    protected $rules = [
        'name' => 'required|min:3|unique:entities,name',
	];

    /**
     * @var array
     */
    protected $fillable = [
		'name',
	];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function permissions()
	{
		return $this->hasMany('GeneaLabs\Bones\Keeper\Models\Permission', 'entity_key');
	}

    /**
     * @param $command
     * @return $this
     */
    public static function add($command)
    {
        static::create(['name' => $command->name]);
        $entity = static::find($command->name);
        $entity->raise(new EntityWasAddedEvent($entity));

        return $entity;
    }

    /**
     * @param $command
     * @return $this
     */
    public static function modify($command)
    {
        $entity = static::find($command->name);
        if ($entity && isset($command->data['name'])) {
            $entity->name = $command->data['name'];
            $entity->save();
            $entity->raise(new EntityWasModifiedEvent($entity));
        }

        return $entity;
    }

    public static function remove($command)
    {
        $isSuccessful = false;
        $entity = static::find($command->name);
        if ($entity) {
            $entity->delete();
            $entity->raise(new EntityWasRemovedEvent($entity));
            $isSuccessful = true;
        }

        return $isSuccessful;
    }
}
