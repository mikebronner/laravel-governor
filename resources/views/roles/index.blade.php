@extends('genealabs-bones-keeper::master')

@section('innerContent')
    <div class="page-header">
        @can('create', $roles->first())
        {!! link_to_route('roles.create', 'Add New Role', null, ['class' => 'btn btn-success btn-lg pull-right']) !!}
        @endcan
        <h1>Roles</h1>
    </div>
    @can('view', $roles->first())
    <div class="list-group">
    @foreach($roles as $role)
        <a {!! ((Auth::user()->can('edit', $role) && ($role->name != 'SuperAdmin')) ? 'href="' . route('roles.edit', $role->name) . '"' : 'disabled') !!} class="list-group-item">
            <h4 class="list-group-item-heading">{{ $role->name }}</h4>
            <p class="list-group-item-text">{{ $role->description }}</p>
        </a>
    @endforeach
    </div>
    @endcan
@stop
