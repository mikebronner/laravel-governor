<?php namespace GeneaLabs\LaravelGovernor\Tests\Feature;

use GeneaLabs\LaravelGovernor\Role;
use GeneaLabs\LaravelGovernor\Tests\Models\SuperAdminUser;
use GeneaLabs\LaravelGovernor\Tests\TestCase;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class RulesPageTest extends TestCase
{
    public function testThatRulesPageIsAccessibleWhenAuthenticated()
    {
        $user = new SuperAdminUser([
            'name' => 'Joe Test',
            'email' => 'none@noemail.com',
            'password' => 'not hashed but who cares',
        ]);
        auth()->login($user);
        $response = $this->get(route('genealabs.laravel-governor.roles.index'));

        $response->assertStatus(200);
    }

    public function testThatRulesPageIsNotAccessibleWhenNotAuthenticated()
    {
        $this->expectException(AuthenticationException::class);

        $this->get(route('genealabs.laravel-governor.roles.index'));
    }

    public function testAuthenticatedUserCanSeeInitialRoles()
    {
        $user = new SuperAdminUser([
            'name' => 'Joe Test',
            'email' => 'none@noemail.com',
            'password' => 'not hashed but who cares',
        ]);
        auth()->login($user);
        $response = $this->get(route('genealabs.laravel-governor.roles.index'));

        $response->assertSee('Member');
        $response->assertSee('SuperAdmin');
    }
}
