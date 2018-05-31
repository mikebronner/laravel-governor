<?php namespace GeneaLabs\LaravelGovernor\Tests\Feature;

use GeneaLabs\LaravelGovernor\Tests\Models\SuperAdminUser;
use GeneaLabs\LaravelGovernor\Tests\TestCase;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AssignmentsPageTest extends TestCase
{
    public function testThatAssignmentPageIsAccessibleWhenAuthenticated()
    {
        $user = new SuperAdminUser([
            'name' => 'Joe Test',
            'email' => 'none@noemail.com',
            'password' => 'not hashed but who cares',
        ]);
        auth()->login($user);
        $response = $this->get(route('genealabs.laravel-governor.assignments.edit', 0));

        $response->assertStatus(200);
    }

    public function testThatssignmentPageIsNotAccessibleWhenNotAuthenticated()
    {
        $this->expectException(AuthenticationException::class);

        $this->get(route('genealabs.laravel-governor.assignments.edit', 0));
    }

    public function testAuthenticatedUserCanSeeAssignments()
    {
        $user = new SuperAdminUser([
            'name' => 'Joe Test',
            'email' => 'none@noemail.com',
            'password' => 'not hashed but who cares',
        ]);
        auth()->login($user);
        $response = $this->get(route('genealabs.laravel-governor.assignments.edit', 0));

        $response->assertSee('Member');
        $response->assertSee('SuperAdmin');
    }
}
