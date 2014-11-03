@extends('genealabs/bones-keeper::master')

@section('innerContent')
<div class="container">
    <div class="page-header">
        {{ link_to_route('permissions.create', 'Add New Permission', null, ['class' => 'btn btn-default pull-right']) }}
        <h1>Permissions</h1>
    </div>
    <div class="list-group">
    @foreach($permissions as $permission)
        <a href="{{ route('permissions.edit', $permission->entity) }}" class="list-group-item">
            <p class="list-group-item-text">User can (create|view|inspect|update|delete) (own|other|any) <strong>{{ $permission->entity }}</strong>.</p>
        </a>
    @endforeach
    </div>
</div>
@stop
