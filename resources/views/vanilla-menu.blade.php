<nav class="governor-menu">
    <ul class="menu">
        <li class="menu-item">
            <strong>
                Authorization Management
            </strong>
        </li>
        <li class="menu-item {{ str_contains(request()->route()->getName(), 'genealabs.laravel-governor.roles.') ? 'active' : '' }}">
            <a href="{{ route('genealabs.laravel-governor.roles.index') }}">
                Roles
            </a>
        </li>
        <li class="menu-item {{ str_contains(request()->route()->getName(), 'genealabs.laravel-governor.assignments.') ? 'active' : '' }}">
            <a href="{{ route('genealabs.laravel-governor.assignments.index') }}">
                Assignments
            </a>
        </li>
    </ul>
</nav>
