@extends('genealabs-laravel-governor::layout')

@section('governorContent')
    @can('create', $role)
        <div class="panel panel-default">
            <div class="panel-heading">
                Roles Management > Add New Role
            </div>
            <div class="panel-body">
                {!! Form::open(['route' => 'genealabs.laravel-governor.roles.store', 'method' => 'POST', 'class' => 'form-horizontal']) !!}
                {!! Form::text('name', null, ['class' => 'form-control', 'label' => 'Name']) !!}
                {!! Form::textarea('description', null, ['class' => 'form-control', 'label' => 'Description']) !!}
                {!! Form::submit('Add Role', ['class' => 'btn btn-primary', 'cancelUrl' => route('genealabs.laravel-governor.roles.index')]) !!}
                {!! Form::close() !!}
            </div>
        </div>
    @endcan
@stop
