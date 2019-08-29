<?php namespace GeneaLabs\LaravelGovernor\Tests\Feature;

use GeneaLabs\LaravelGovernor\Tests\Models\User;
use GeneaLabs\LaravelGovernor\Tests\TestCase;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use GeneaLabs\LaravelGovernor\Tests\IntegrationTestCase;

class AssignmentsPageTest extends IntegrationTestCase
{
    // public function testThatAssignmentPageIsAccessibleWhenAuthenticated()
    // {
    //     $user = (new User)->firstOrNew([
    //             'email' => 'none@noemail.com',
    //         ])
    //         ->fill([
    //             'name' => 'Joe Test',
    //             'password' => 'not hashed but who cares',
    //         ]);
    //     $user->save();
    //     $user->roles()->sync(["SuperAdmin"]);
    //     $response = $this
    //         ->actingAs($user, "api")
    //         ->get(route('genealabs.laravel-governor.assignments.edit', 0));

    //     $response->assertStatus(200);
    // }

    // public function testThatAssignmentPageIsNotAccessibleWhenNotAuthenticated()
    // {
    //     $response = $this
    //         ->get(route('genealabs.laravel-governor.assignments.edit', 0));

    //     $response->assertRedirect("/login");
    // }

    // public function testAuthenticatedUserCanSeeAssignments()
    // {
    //     $user = (new User)->firstOrNew([
    //             'email' => 'none@noemail.com',
    //         ])
    //         ->fill([
    //             'name' => 'Joe Test',
    //             'password' => 'not hashed but who cares',
    //         ]);
    //     $user->save();
    //     $user->roles()->sync(["SuperAdmin"]);
    //     auth()->login($user);
    //     $response = $this->get(route('genealabs.laravel-governor.assignments.edit', 0));

    //     $response->assertSee('Member');
    //     $response->assertSee('SuperAdmin');
    // }
}
