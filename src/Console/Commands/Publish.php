<?php namespace GeneaLabs\LaravelGovernor\Console\Commands;

use GeneaLabs\LaravelGovernor\Providers\LaravelGovernorService;
use Illuminate\Console\Command;

class Publish extends Command
{
    protected $signature = 'governor:publish {--assets} {--config} {--views}';
    protected $description = 'Publish various assets of the Laravel Casts package.';

    public function handle()
    {
        if ($this->option('assets')) {
            $result = $this->call('casts:publish', ['--assets' => true]);
        }

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
    }
}
