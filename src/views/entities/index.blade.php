@extends('genealabs-bones-keeper::master')

@section('innerContent')
    <div class="page-header">
        @if (Auth::check() && Auth::user()->hasPermissionTo('add', 'any', 'entity'))
        {!! link_to_route('entities.create', 'Add New Entity', [], ['class' => 'btn btn-success btn-lg pull-right']) !!}
        @endif
        <h1>Entities</h1>
    </div>
    @if (Auth::check() && Auth::user()->hasPermissionTo('view', 'any', 'entity'))
    <div class="list-group">
    <?php $canEditEntities = (Auth::user()->hasPermissionTo('change', 'any', 'entity')); ?>
    @foreach($entities as $entity)
        <a {!! (($canEditEntities) ? 'href="' . route('entities.edit', $entity->name) . '"' : '') !!} class="list-group-item">
            <p class="list-group-item-text">User can (create|view|inspect|edit|remove) (own|other|any) <strong>{{ $entity->name }}</strong>.</p>
        </a>
    @endforeach
    </div>
    @else
    <div class="panel panel-danger">
        <div class="panel-heading">Access Forbidden</div>
        <div class="panel-body">
            You don't have access to view entities. Please contact your admin to check if you have the necessary permissions.
        </div>
        <div class="panel-footer">
            {!! link_to('/', 'Return to home page.', ['class' => 'btn btn-success']) !!}
        </div>
    </div>
    @endif
@stop
