<?php

declare(strict_types=1);

namespace GeneaLabs\LaravelGovernor\Database\Seeders;

use GeneaLabs\LaravelGovernor\Traits\EntityManagement;
use Illuminate\Container\Container;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;

class LaravelGovernorUpgradeTo0130 extends Seeder
{
    use EntityManagement;

    public function run(): void
    {
        $this->migrateOwnedByData();
    }

    protected function migrateOwnedByData(): void
    {
        $this->getModels()
            ->each(function (string $modelClass): void {
                $this->migrateModel($modelClass);
            });
    }

    public function migrateModel(string $modelClass): void
    {
        $model = new $modelClass;
        $table = $model->getTable();
        $connection = $model->getConnectionName();
        $keyName = $model->getKeyName();

        // Store the morph class (alias under a registered morph map, FQCN
        // otherwise) so migrated rows match how the governorOwner() MorphOne
        // reads ownership — a raw FQCN would orphan the rows under a morph map.
        $morphClass = $model->getMorphClass();

        if (! Schema::connection($connection)->hasColumn($table, 'governor_owned_by')) {
            return;
        }

        // Chunk by primary key so the upgrade scales to large tables without
        // loading every row into memory at once, and batch-insert each chunk.
        DB::connection($connection)
            ->table($table)
            ->whereNotNull('governor_owned_by')
            ->select([$keyName, 'governor_owned_by'])
            ->orderBy($keyName)
            ->chunkById(1000, function (Collection $records) use ($morphClass, $keyName): void {
                $rows = $records
                    ->map(fn ($record): array => [
                        'ownable_type' => $morphClass,
                        'ownable_id' => $record->{$keyName},
                        'user_id' => $record->governor_owned_by,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ])
                    ->all();

                if ($rows !== []) {
                    DB::table('governor_ownables')->insertOrIgnore($rows);
                }
            }, $keyName);
    }

    protected function getModels(): Collection
    {
        if (! is_dir(app_path())) {
            return collect();
        }

        return collect(File::allFiles(app_path()))
            ->map(function ($item) {
                $path = $item->getRelativePathName();
                $class = sprintf(
                    '\%s%s',
                    Container::getInstance()->getNamespace(),
                    strtr(substr($path, 0, strrpos($path, '.')), '/', '\\'),
                );

                return $class;
            })
            ->filter(function ($class) {
                if (! class_exists($class)) {
                    return false;
                }

                $reflection = new \ReflectionClass($class);

                return $reflection->isSubclassOf(Model::class)
                    && ! $reflection->isAbstract()
                    && in_array(
                        'GeneaLabs\LaravelGovernor\Traits\Governable',
                        class_uses_recursive($class),
                    );
            })
            ->values();
    }
}
