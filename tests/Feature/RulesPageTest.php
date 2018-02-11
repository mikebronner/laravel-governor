<?php namespace GeneaLabs\LaravelGovernor\Tests\Feature;

use GeneaLabs\LaravelGovernor\Role;
use GeneaLabs\LaravelGovernor\Tests\Models\User;
use GeneaLabs\LaravelGovernor\Tests\FeatureTestCase;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class RulesPageTest extends FeatureTestCase
{
    public function testThatRulesPageIsAccessibleWhenAuthenticated()
    {
        $user = new User([
            'name' => 'Joe Test',
            'email' => 'none@noemail.com',
            'password' => 'not hashed but who cares',
        ]);
        auth()->login($user);
        $response = $this->get(route('genealabs.laravel-governor.roles.index'));

        $response->assertResponseStatus(200);
    }

    public function testThatRulesPageIsNotAccessibleWhenNotAuthenticated()
    {
        $this->expectException(AuthenticationException::class);

        $this->visit(route('genealabs.laravel-governor.roles.index'));
    }

    public function testAuthenticatedUserCanSeeInitialRoles()
    {
        $user = new User([
            'name' => 'Joe Test',
            'email' => 'none@noemail.com',
            'password' => 'not hashed but who cares',
        ]);
        auth()->login($user);
        $response = $this->get(route('genealabs.laravel-governor.roles.index'));

        $response->see('Member');
        $response->see('SuperAdmin');
    }
}
