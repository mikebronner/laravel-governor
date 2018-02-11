<?php namespace GeneaLabs\LaravelGovernor\Tests\Browser;

use GeneaLabs\LaravelGovernor\Tests\App\User;
use GeneaLabs\LaravelGovernor\Tests\BrowserTestCase;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AssignmentsPageTest extends BrowserTestCase
{
    public function testThatRulesPageIsNotAccessibleWhenNotAuthenticated()
    {
        // $this->expectException(AuthenticationException::class);

        $this->browse(function ($browser) {
            $response = $browser->visit(route('genealabs.laravel-governor.assignments.index'));
            $response->assertTitle("404 Not Found");
            $browser->closeAll();
        });

        // $this->visit(route('genealabs.laravel-governor.assignments.index'));
        // $response->assertPathIs('/genealabs/laravel-governor/assignments');
    }

    public function testThatRulesPageIsAccessibleWhenAuthenticated()
    {
        $user = new User([
            'name' => 'Joe Test',
            'email' => 'none@noemail.com',
            'password' => 'not hashed but who cares',
        ]);
        $this->loginAs($user);
        $this->browse(function ($browser) {
            $response = $browser->visit(route('genealabs.laravel-governor.assignments.index'));
            $response->assertPathIs('/genealabs/laravel-governor/assignments');
        });
    }
/**
 * @group test
 */
    public function testAuthenticatedUserCanSeeInitialRoles()
    {
        $user = (new User)->create([
            'name' => 'Joe Test',
            'email' => 'none@noemail.com',
            'password' => 'not hashed but who cares',
        ]);

        $this->browse(function ($browser) use ($user) {
            $response = $browser->loginAs($user)
                ->visit(route('genealabs.laravel-governor.assignments.index'));
            $response->dump();
            $response->assertSee('Member');
            $response->assertSee('SuperAdmin');
            $response->closeAll();
        });
    }
}
