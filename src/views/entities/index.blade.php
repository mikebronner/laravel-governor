@extends('genealabs/bones-keeper::master')

@section('innerContent')
<div class="container">
    <div class="page-header">
        {{ link_to_route('entities.create', 'Add New Permission', null, ['class' => 'btn btn-default pull-right']) }}
        <h1>Entities</h1>
    </div>
    <div class="list-group">
    @foreach($entities as $entity)
        <a href="{{ route('entities.edit', $entity->name) }}" class="list-group-item">
            <p class="list-group-item-text">User can (create|view|inspect|update|delete) (own|other|any) <strong>{{ $entity->name }}</strong>.</p>
        </a>
    @endforeach
    </div>
</div>
@stop
