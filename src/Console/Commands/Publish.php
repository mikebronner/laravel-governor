<?php namespace GeneaLabs\LaravelGovernor\Console\Commands;

use GeneaLabs\LaravelGovernor\Providers\Service as LaravelGovernorService;
use Illuminate\Console\Command;

class Publish extends Command
{
    protected $signature = 'governor:publish {--assets} {--config} {--views} {--migrations}';
    protected $description = 'Publish various assets of the Laravel Governor package.';

    public function handle()
    {
        if ($this->option('config')) {
            $this->call('vendor:publish', [
                '--provider' => LaravelGovernorService::class,
                '--tag' => ['config'],
                '--force' => true,
            ]);
        }

        if ($this->option('views')) {
            $this->call('vendor:publish', [
                '--provider' => LaravelGovernorService::class,
                '--tag' => ['views'],
                '--force' => true,
            ]);
        }

        if ($this->option('migrations')) {
            $this->call('vendor:publish', [
                '--provider' => LaravelGovernorService::class,
                '--tag' => ['migrations'],
                '--force' => true,
            ]);
        }

        if ($this->option('assets')) {
            $this->call('vendor:publish', [
                '--provider' => LaravelGovernorService::class,
                '--tag' => ['assets'],
                '--force' => true,
            ]);
        }
    }
}
