@extends ('genealabs-laravel-governor::layout')

@section ('governorContent')
    <h1>Roles Management</h1>

    @can ('create', $roles->first())
        <a href="{{ route("genealabs.laravel-governor.roles.create") }}"
            style="float: right;"
        >
            Add New Role
        </a>
    @endcan

    @can ('view', $roles->first())
        @foreach ($roles as $role)
            <h2>

                @if (auth()->user()->can('edit', $role) && $role->name !== "SuperAdmin")
                    <a href="{{ route('genealabs.laravel-governor.roles.edit', $role->name) }}">
                @endif

                {{ $role->name }}

                @if (auth()->user()->can('edit', $role) && $role->name !== "SuperAdmin")
                    </a>
                @endif

            </h2>
            <p>{{ $role->description }}</p>
        @endforeach
    @endcan
@stop
