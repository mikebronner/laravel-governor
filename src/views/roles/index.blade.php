@extends('genealabs-bones-keeper::master')

@section('innerContent')
    <div class="page-header">
        @if (Auth::check() && Auth::user()->hasPermissionTo('add', 'any', 'role'))
        {!! link_to_route('roles.create', 'Add New Role', null, ['class' => 'btn btn-success btn-lg pull-right']) !!}
        @endif
        <h1>Roles</h1>
    </div>
    @if (Auth::check() && Auth::user()->hasPermissionTo('view', 'any', 'role'))
    <?php $canEditRoles = (Auth::user()->hasPermissionTo('change', 'any', 'role')); ?>
    <div class="list-group">
    @foreach($roles as $role)
        <a {!! (($canEditRoles && ($role->name != 'SuperAdmin')) ? 'href="' . route('roles.edit', $role->name) . '"' : 'disabled') !!} class="list-group-item">
            <h4 class="list-group-item-heading">{{ $role->name }}</h4>
            <p class="list-group-item-text">{{ $role->description }}</p>
        </a>
    @endforeach
    </div>
    @else
    <div class="panel panel-danger">
        <div class="panel-heading">Access Forbidden</div>
        <div class="panel-body">
            You don't have access to view roles. Please contact your admin to check if you have the necessary permissions.
        </div>
        <div class="panel-footer">
            {!! link_to('/', 'Return to home page.', ['class' => 'btn btn-success']) !!}
        </div>
    </div>
    @endif
@stop
