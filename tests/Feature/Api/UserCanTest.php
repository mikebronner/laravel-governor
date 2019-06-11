<?php namespace GeneaLabs\LaravelGovernor\Tests\Feature\Api;

use GeneaLabs\LaravelGovernor\Tests\Models\User;
use GeneaLabs\LaravelGovernor\Tests\Models\SuperAdminUser;
use GeneaLabs\LaravelGovernor\Tests\TestCase;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use GeneaLabs\LaravelGovernor\Role;
use GeneaLabs\LaravelGovernor\Tests\IntegrationTestCase;

class UserCanTest extends IntegrationTestCase
{
    // public function testAuthenticatedUserCannotCheckPermissions()
    // {
    //     $user = (new User)->create([
    //         'name' => 'Joe Test',
    //         'email' => 'none@noemail.com',
    //         'password' => 'not hashed but who cares',
    //     ]);
    //     $user->load("roles");
    //     $response = $this
    //         ->actingAs($user, "api")
    //         ->json(
    //             "GET",
    //             route('genealabs.laravel-governor.api.user-can.show', "create"),
    //             [
    //                 "model" => "GeneaLabs\LaravelGovernor\Role",
    //             ]
    //         );

    //     $response->assertStatus(403);
    // }

    // public function testAuthenticatedUserCanCheckPermissions()
    // {
    //     $user = (new User)->create([
    //         'name' => 'Joe Test',
    //         'email' => 'none2@noemail.com',
    //         'password' => 'not hashed but who cares',
    //     ]);
    //     $user->roles()->sync(["SuperAdmin"]);
    //     $user->save();

    //     $response = $this
    //         ->actingAs($user, "api")
    //         ->json(
    //             "GET",
    //             route('genealabs.laravel-governor.api.user-can.show', "create"),
    //             [
    //                 "model" => "GeneaLabs\LaravelGovernor\Role",
    //             ]
    //         );

    //     $response->assertStatus(204);
    // }
}
