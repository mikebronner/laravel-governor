@extends('genealabs-laravel-governor::master')

@section('innerContent')
    @can('edit', $role)
    @if ($role->name != 'SuperAdmin' && $role->name != 'Members' && Auth::check())
    <div class="panel panel-default">
        <div class="panel-heading">
            Roles Management > Edit Role '{{ $role->name }}'
        </div>
        <div class="panel-body">
            {!! Form::model($role, ['route' => ['genealabs.laravel-governor.roles.update', $role->name], 'method' => 'PATCH', 'class' => 'form-horizontal', 'id' => 'editForm', 'labelWidth' => 2, 'fieldWidth' => 10]) !!}
            {!! Form::text('name', null, ['class' => 'form-control', 'label' => 'Name', ($role->name === 'Member' ? 'disabled' : '')]) !!}
            {!! Form::textarea('description', null, ['class' => 'form-control', 'label' => 'Description', ($role->name === 'Member' ? 'disabled' : '')]) !!}
            <div class="form-group">
                {!! Form::label('description', 'Permissions', ['class' => 'control-label col-sm-2']) !!}
                <div class="col-sm-10">
                    <ul class="list-group">
                        @foreach($permissionMatrix as $entity => $actionSubMatrix)
                            <?php $policyCounter = 0; ?>
                            <li class="list-group-item form-inline">
                                <span class="text-muted">Can</span>
                                @foreach($actionSubMatrix as $action => $ownershipSelected)
                                    {!! Form::hidden('permissions[' . $entity . '][' . $action . ']', $ownershipSelected, ['id' => 'permissions-' . $entity . '-' . $action]) !!}
                                    <span class="dropdown">
                                        <a id="selected-{{ $entity }}-{{ $action }}" data-target="#" href="#" data-toggle="dropdown" class="dropdown-toggle {{{ ($ownershipSelected === 'any') ? 'text-success' : (($ownershipSelected === 'own' || $ownershipSelected === 'other') ? 'text-info' : 'text-danger') }}}">{{{ $action }}} {{{ $ownershipSelected }}}</a>{!! (($policyCounter === count($actionSubMatrix) - 2) ? ', <span class="text-muted">and</span> ' : (($policyCounter === count($actionSubMatrix) - 1) ? '' : ', ')) !!}
                                        <ul class="dropdown-menu ownershipDropDown">
                                            @if (count($ownershipOptions))
                                                {!! '<li><a data-entity="' . $entity . '" data-action="' . $action . '">' . $action . ' ' . implode('</a></li><li><a data-entity="' . $entity . '" data-action="' . $action . '">' . $action . ' ', $ownershipOptions) . '</a></li>' !!}
                                            @endif
                                        </ul>
                                    </span>
                                    <?php $policyCounter++; ?>
                                @endforeach
                                <strong>{!! str_plural($entity) !!}</strong>.
                            </li>
                        @endforeach
                    </ul>
                </div>
            </div>
            {!! Form::close() !!}
            {!! Form::open(['route' => ['genealabs.laravel-governor.roles.destroy', $role->name], 'method' => 'DELETE', 'class' => 'form-horizontal', 'id' => 'deleteForm']) !!}
            {!! Form::close() !!}
            <div class="form-horizontal">
                <div class="form-group">
                    <div class="col-sm-2">
                        {!! link_to_route('genealabs.laravel-governor.roles.index', 'Cancel', [], ['class' => 'btn btn-default pull-left']) !!}
                    </div>
                    <div class="col-sm-10">
                        {!! Form::button('Update Role', ['class' => 'btn btn-primary', 'onclick' => 'submitForm($("#editForm"));']) !!}
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
    @endif
    @endcan
@stop
