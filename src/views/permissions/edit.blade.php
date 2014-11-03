    @extends('genealabs/bones-keeper::master')

    @section('innerContent')
    <div class="container">
        <h1 class="page-header">Edit Permission</h1>
        <div class="well">
        {{ Form::model($permission, ['route' => ['permissions.update', $permission->entity], 'method' => 'PATCH', 'class' => 'form-horizontal']) }}
            <div class="form-group{{ (count($errors) > 0) ? (($errors->has('entity')) ? ' has-feedback has-error' : ' has-feedback has-success') : ''; }}">
                {{ Form::label('entity', 'Entity', ['class' => 'control-label col-sm-2']) }}
                <div class="col-sm-5">
                    {{ Form::text('entity', null, ['class' => 'form-control']) }}
                    @if (count($errors))
                    <span class="glyphicon {{ ($errors->has('entity')) ? ' glyphicon-remove' : ' glyphicon-ok'; }} form-control-feedback"></span>
                    @endif
                </div>
                {{ $errors->first('entity', '<span class="help-block col-sm-5">:message</span>') }}
            </div>

            <div class="form-group">
                <div class="col-sm-2">
                    {{ link_to_route('roles.index', 'Cancel', null, ['class' => 'btn btn-default pull-left']) }}
                </div>
                <div class="col-sm-10 btn-group">
                    {{ Form::submit('Update Permission', ['class' => 'btn btn-success']) }}
                </div>
            </div>
        {{ Form::close() }}
        {{ Form::open(['route' => ['permissions.destroy', $permission->entity], 'method' => 'DELETE', 'class' => 'form-horizontal']) }}
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10 btn-group">
                    {{ Form::submit('Delete Permission', ['class' => 'btn btn-danger']) }}
                </div>
            </div>
        {{ Form::close() }}
        </div>
    </div>
    @stop
