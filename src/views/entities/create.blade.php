    @extends('genealabs-bones-keeper::master')

    @section('innerContent')
        <h1 class="page-header">Add Entity</h1>
        @if (Auth::check() && Auth::user()->hasPermissionTo('add', 'any', 'entity'))
        {!! Form::open(['route' => 'entities.store', 'method' => 'POST', 'class' => 'form-horizontal well']) !!}
            <div class="form-group{{ (count($errors) > 0) ? (($errors->has('name')) ? ' has-feedback has-error' : ' has-feedback has-success') : '' }}">
                {!! Form::label('name', 'Name', ['class' => 'control-label col-sm-2']) !!}
                <div class="col-sm-5">
                    {!! Form::text('name', null, ['class' => 'form-control']) !!}
                    @if (count($errors))
                    <span class="glyphicon {{ ($errors->has('name')) ? ' glyphicon-remove' : ' glyphicon-ok' }} form-control-feedback"></span>
                    @endif
                </div>
                {!! $errors->first('name', '<span class="help-block col-sm-5">:message</span>') !!}
            </div>
            <div class="form-group{{ (count($errors) > 0) ? (($errors->has('message')) ? ' has-feedback has-error' : ' has-feedback has-success') : '' }}">
                <div class="col-sm-2">
                    {!! link_to_route('entities.index', 'Cancel', [], ['class' => 'btn btn-default pull-left']) !!}
                </div>
                <div class="col-sm-10">
                    {!! Form::submit('Add Entity', ['class' => 'btn btn-success']) !!}
                </div>
            </div>
        {!! Form::close() !!}
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
