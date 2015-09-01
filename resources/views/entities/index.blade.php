@extends('genealabs-bones-keeper::master')

@section('innerContent')
    <div class="page-header">
        @can('edit', $entities->first())
        {!! link_to_route('entities.create', 'Add New Entity', [], ['class' => 'btn btn-success btn-lg pull-right']) !!}
        @endcan
        <h1>Entities</h1>
    </div>
    @can('view', $entities->first())
    <div class="list-group">
    @foreach($entities as $entity)
        <a {!! ((Auth::user()->can('edit', $entity)) ? 'href="' . route('entities.edit', $entity->name) . '"' : '') !!} class="list-group-item">
            <p class="list-group-item-text">User can (create|view|inspect|edit|remove) (own|other|any) <strong>{{ $entity->name }}</strong>.</p>
        </a>
    @endforeach
    </div>
    @endcan
@stop
