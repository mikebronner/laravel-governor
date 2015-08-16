@extends('genealabs-bones-keeper::master')

@section('innerContent')
        <h1 class="page-header">Edit Role</h1>
        @if ($role->name != 'SuperAdmin' && $role->name != 'Members' && Auth::check() && Auth::user()->hasPermissionTo('change', 'any', 'role'))
        <div class="well">
            {!! Form::model($role, ['route' => ['roles.update', $role->name], 'method' => 'PATCH', 'class' => 'form-horizontal', 'id' => 'editForm']) !!}
                <div class="form-group{{ (count($errors) > 0) ? (($errors->has('name')) ? ' has-feedback has-error' : ' has-feedback has-success') : '' }}">
                    {!! Form::label('name', 'Name', ['class' => 'control-label col-sm-2']) !!}
                    <div class="col-sm-5">
                        @if ($role->name != 'Member')
                        {!! Form::text('name', null, ['class' => 'form-control']) !!}
                        @else
                        {!! Form::hidden('name', $role->name) !!}
                        {!! Form::label('name', $role->name, ['class' => 'help-block']) !!}
                        @endif
                        @if (count($errors))
                        <span class="glyphicon {{ ($errors->has('name')) ? ' glyphicon-remove' : ' glyphicon-ok' }} form-control-feedback"></span>
                        @endif
                    </div>
                    {!! $errors->first('name', '<span class="help-block col-sm-5">:message</span>') !!}
                </div>
                <div class="form-group{{ (count($errors) > 0) ? (($errors->has('description')) ? ' has-feedback has-error' : ' has-feedback has-success') : '' }}">
                    {!! Form::label('description', 'Description', ['class' => 'control-label col-sm-2']) !!}
                    <div class="col-sm-5">
                        @if ($role->name != 'Member')
                        {!! Form::textarea('description', null, ['class' => 'form-control']) !!}
                        @else
                        {!! Form::hidden('description', $role->description) !!}
                        {!! Form::label('description', $role->description, ['class' => 'help-block']) !!}
                        @endif
                        @if (count($errors))
                        <span class="glyphicon {{ ($errors->has('description')) ? ' glyphicon-remove' : ' glyphicon-ok' }} form-control-feedback"></span>
                        @endif
                    </div>
                    {!! $errors->first('description', '<span class="help-block col-sm-5">:message</span>') !!}
                </div>
                <div class="form-group">
                    {!! Form::label('description', 'Permissions', ['class' => 'control-label col-sm-2']) !!}
                    <div class="col-sm-10">
                        <ul class="list-group">
                            @foreach($permissionMatrix as $entity => $actionSubMatrix)
                            <li class="list-group-item form-inline">
                                This role can
                                @foreach($actionSubMatrix as $action => $ownershipSelected)
                                    <div class="input-group input-group-sm">
                                        <span class="input-group-addon">{{ $action }}</span>
                                        <span id="selected-{{ $entity }}-{{ $action }}" class="form-control">{{ $ownershipSelected }}</span>
                                        {!! Form::hidden('permissions[' . $entity . '][' . $action . ']', $ownershipSelected, ['id' => 'permissions-' . $entity . '-' . $action]) !!}
                                        <div class="input-group-btn">
                                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                <span class="caret"></span>
                                            </button>
                                            <ul class="dropdown-menu pull-right ownershipDropDown">
                                                @if (count($ownershipOptions))
                                                {!! '<li><a data-entity="' . $entity . '" data-action="' . $action . '">' . implode('</a></li><li><a data-entity="' . $entity . '" data-action="' . $action . '">', $ownershipOptions) . '</a></li>' !!}
                                                @endif
                                            </ul>
                                        </div>
                                    </div>
                                @endforeach
                                {!! str_plural($entity) !!}.
                            </li>
                            @endforeach
                        </ul>
                    </div>
                </div>
            {!! Form::close() !!}
            {!! Form::open(['route' => ['roles.destroy', $role->name], 'method' => 'DELETE', 'class' => 'form-horizontal', 'id' => 'deleteForm']) !!}
            {!! Form::close() !!}
            <div class="form-horizontal">
                <div class="form-group">
                    <div class="col-sm-2">
                        {!! link_to_route('roles.index', 'Cancel', [], ['class' => 'btn btn-default pull-left']) !!}
                    </div>
                    <div class="col-sm-10 btn-group">
                        {!! Form::button('Update Role', ['class' => 'btn btn-success', 'onclick' => 'submitForm($("#editForm"));']) !!}
                        @if ($role->name != 'Member')
                        {!! Form::button('Delete Role', ['class' => 'btn btn-danger', 'data-toggle' => 'modal', 'data-target' => '#deleteModal']) !!}
                        @endif
                    </div>
                </div>
            </div>
        </div>
    <div class="modal" id="deleteModal">
        <div class="modal-dialog">
            <div class="modal-content panel-danger">
                <div class="modal-header panel-heading">
                    <h4 class="modal-title">Delete this Role?</h4>
                </div>
                <div class="modal-body">
                    <p>Are you absolutely sure you want to destroy this poor role? It will be blasted to oblivion, if you continue to the affirmative.</p>
                </div>
                <div class="modal-footer panel-footer">
                    <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger pull-right" onclick="submitForm($('#deleteForm'));">Delete Role</button>
                </div>
            </div>
        </div>
    </div>
    @else
    <div class="panel panel-danger">
        <div class="panel-heading">Access Forbidden</div>
        <div class="panel-body">
            You don't have access to edit (this, or perhaps any) roles. Please contact your admin to check if you have the necessary permissions.
        </div>
        <div class="panel-footer">
            {!! link_to('/', 'Return to home page.', ['class' => 'btn btn-success']) !!}
        </div>
    </div>
    @endif
@stop
