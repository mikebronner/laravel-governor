<?php namespace GeneaLabs\LaravelGovernor\Tests\Feature;

use GeneaLabs\LaravelGovernor\Tests\Models\User;
use GeneaLabs\LaravelGovernor\Tests\TestCase;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AssignmentsPageTest extends TestCase
{
    public function testThatRulesPageIsAccessibleWhenAuthenticated()
    {
        $user = new User([
            'name' => 'Joe Test',
            'email' => 'none@noemail.com',
            'password' => 'not hashed but who cares',
        ]);
        auth()->login($user);
        $response = $this->get(route('genealabs.laravel-governor.assignments.index'));

        $response->assertStatus(200);
    }

    public function testThatRulesPageIsNotAccessibleWhenNotAuthenticated()
    {
        $this->expectException(AuthenticationException::class);

        $this->get(route('genealabs.laravel-governor.assignments.index'));
    }

    public function testAuthenticatedUserCanSeeInitialRoles()
    {
        $user = new User([
            'name' => 'Joe Test',
            'email' => 'none@noemail.com',
            'password' => 'not hashed but who cares',
        ]);
        auth()->login($user);
        $response = $this->get(route('genealabs.laravel-governor.assignments.index'));

        $response->assertSee('Member');
        $response->assertSee('SuperAdmin');
    }
}
