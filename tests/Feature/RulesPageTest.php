<?php namespace GeneaLabs\LaravelGovernor\Tests\Feature;

use GeneaLabs\LaravelGovernor\Role;
use GeneaLabs\LaravelGovernor\Tests\Models\User;
use GeneaLabs\LaravelGovernor\Tests\TestCase;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class RulesPageTest extends TestCase
{
    public function testThatRulesPageIsAccessibleWhenAuthenticated()
    {
        $user = (new User)->firstOrNew([
                'email' => 'none@noemail.com',
            ])
            ->fill([
                'name' => 'Joe Test',
                'password' => 'not hashed but who cares',
            ]);
        $user->save();
        $user->roles()->sync(["SuperAdmin"]);

        $response = $this
            ->actingAs($user)
            ->get(route('genealabs.laravel-governor.roles.index'));

        $response->assertStatus(200);
    }

    public function testThatRulesPageIsNotAccessibleWhenNotAuthenticated()
    {
        $this
            ->get(route('genealabs.laravel-governor.roles.index'))
            ->assertRedirect("/login");
    }

    public function testAuthenticatedUserCanSeeInitialRoles()
    {
        $user = (new User)->firstOrNew([
                'email' => 'none@noemail.com',
            ])
            ->fill([
                'name' => 'Joe Test',
                'password' => 'not hashed but who cares',
            ]);
        $user->save();
        $user->roles()->sync(["SuperAdmin"]);

        $response = $this
            ->actingAs($user)
            ->get(route('genealabs.laravel-governor.roles.index'));

        $response->assertSee('Member');
        $response->assertSee('SuperAdmin');
    }
}
