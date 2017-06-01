<nav class="navbar navbar-default">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Authorization Management</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li class="{{ str_contains(request()->route()->getName(), 'genealabs.laravel-governor.roles.') ? 'active' : '' }}">
                    <a href="{{ route('genealabs.laravel-governor.roles.index') }}">
                        Roles
                    </a>
                </li>
                <li class="{{ str_contains(request()->route()->getName(), 'genealabs.laravel-governor.assignments.') ? 'active' : '' }}">
                    <a href="{{ route('genealabs.laravel-governor.assignments.index') }}">
                        Assignments
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
