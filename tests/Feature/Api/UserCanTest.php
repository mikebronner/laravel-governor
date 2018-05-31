<?php namespace GeneaLabs\LaravelGovernor\Tests\Feature\Api;

use GeneaLabs\LaravelGovernor\Tests\Models\User;
use GeneaLabs\LaravelGovernor\Tests\Models\SuperAdminUser;
use GeneaLabs\LaravelGovernor\Tests\TestCase;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use GeneaLabs\LaravelGovernor\Role;

class UserCanTest extends TestCase
{
    public function testAuthenticatedUserCannotCheckPermissions()
    {
        $this->expectException(AuthorizationException::class);
        $user = (new User)->create([
            'name' => 'Joe Test',
            'email' => 'none@noemail.com',
            'password' => 'not hashed but who cares',
        ]);
        $user->load("roles");
        $response = $this
            ->actingAs($user, "api")
            ->json(
                "GET",
                route('genealabs.laravel-governor.api.user-can.show', "create"),
                [
                    "model" => "GeneaLabs\LaravelGovernor\Role",
                ]
            );

        $response->assertStatus(401);
    }

    public function testAuthenticatedUserCanCheckPermissions()
    {
        $superAdminUser = (new SuperAdminUser)->create([
            'name' => 'Joe Test',
            'email' => 'none1@noemail.com',
            'password' => 'not hashed but who cares',
        ]);
        $user = (new User)->create([
            'name' => 'Joe Test',
            'email' => 'none2@noemail.com',
            'password' => 'not hashed but who cares',
        ]);
        $user->roles()->sync(["SuperAdmin"]);
        $user->save();

        $response1 = $this
            ->actingAs($superAdminUser, "api")
            ->json(
                "GET",
                route('genealabs.laravel-governor.api.user-can.show', "create"),
                [
                    "model" => "GeneaLabs\LaravelGovernor\Role",
                ]
            );
        $response2 = $this
            ->actingAs($user, "api")
            ->json(
                "GET",
                route('genealabs.laravel-governor.api.user-can.show', "create"),
                [
                    "model" => "GeneaLabs\LaravelGovernor\Role",
                ]
            );

        $response1->assertStatus(204);
        $response2->assertStatus(204);
    }
}
