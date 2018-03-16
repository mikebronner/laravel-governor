<nav class="navbar navbar-light bg-light">
    <div class="container">
        <a class="navbar-brand" href="#">Authorization Management</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="governorMenuItems">
            <ul class="navbar-nav">
                <li class="nav-item {{ str_contains(request()->route()->getName(), 'genealabs.laravel-governor.roles.') ? 'active' : '' }}">
                    <a class="nav-link" href="{{ route('genealabs.laravel-governor.roles.index') }}">
                        Roles
                    </a>
                </li>
                <li class="nav-item {{ str_contains(request()->route()->getName(), 'genealabs.laravel-governor.assignments.') ? 'active' : '' }}">
                    <a class="nav-link" href="{{ route('genealabs.laravel-governor.assignments.index') }}">
                        Assignments
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
