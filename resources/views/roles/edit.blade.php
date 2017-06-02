@extends('genealabs-laravel-governor::layout')

@section('governorContent')
    @can('edit', $role)
        @if ($role->name != 'SuperAdmin' && $role->name != 'Members' && auth()->check())
            <div class="panel panel-default">
                <div class="panel-heading">
                    Roles Management > Edit Role '{{ $role->name }}'

                    @if ($role->name !== 'Member')
                        @form(['route' => ['genealabs.laravel-governor.roles.destroy', $role->name], 'method' => 'DELETE', 'class' => 'form-horizontal pull-right', 'id' => 'deleteForm'])
                            @button('Delete Role', ['class' => 'btn btn-xs btn-danger', 'data-toggle' => 'modal', 'data-target' => '#deleteModal'])
                        @endform
                    @endif

                </div>
                <div class="panel-body">

                    @model($role, ['route' => ['genealabs.laravel-governor.roles.update', $role->name], 'method' => 'PUT', 'framework' => 'bootstrap3', 'class' => 'form-horizontal', 'id' => 'editForm', 'labelWidth' => 2, 'fieldWidth' => 10, 'onsubmit' => 'enableFields();'])
                        @text('name', null, ['disabled' => ($role->name === 'Member' ? 'disabled' : '')])
                        @textarea('description', null, ['disabled' => ($role->name === 'Member' ? 'disabled' : '')])
                        <div class="form-group">
                            @label('permissions', 'Permissions', ['class' => 'control-label col-sm-2'])
                            <div class="col-sm-10">
                                <ul class="list-group">

                                    @foreach($permissionMatrix as $entity => $actionSubMatrix)
                                        @php
                                            $policyCounter = 0;
                                        @endphp

                                        <li class="list-group-item form-inline">
                                            <span class="text-muted">Can</span>

                                            @foreach($actionSubMatrix as $action => $ownershipSelected)
                                                @hidden('permissions[' . $entity . '][' . $action . ']', $ownershipSelected, ['id' => 'permissions-' . $entity . '-' . $action])
                                                <span class="dropdown">
                                                    <a id="selected-{{ $entity }}-{{ $action }}"
                                                        href="#"
                                                        data-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                        class="dropdown-toggle {{ ($ownershipSelected === 'any') ? 'text-success' : (($ownershipSelected === 'own' || $ownershipSelected === 'other') ? 'text-info' : 'text-danger') }}"
                                                    >
                                                        {{ $action }} {{ $ownershipSelected }}
                                                    </a>

                                                    @if ($policyCounter === count($actionSubMatrix) - 2)
                                                        <span class="text-muted">and</span>
                                                    @else
                                                        {{ ($policyCounter === count($actionSubMatrix) - 1) ? '' : ', ' }}
                                                    @endif

                                                    <ul class="dropdown-menu ownershipDropDown"
                                                        aria-labeledby="selected-{{ $entity }}-{{ $action }}"
                                                    >

                                                        @if (count($ownershipOptions))
                                                            <li>
                                                                <a data-entity="{{ $entity }}" data-action="{{ $action }}">
                                                                    {{ $action }}
                                                                    {!! implode("</a></li><li><a data-entity=\"{$entity}\" data-action=\"{$action}\">{$action} ", $ownershipOptions) !!}
                                                                </a>
                                                            </li>
                                                        @endif

                                                    </ul>
                                                </span>

                                                @php
                                                    $policyCounter++;
                                                @endphp
                                            @endforeach

                                            <strong>{!! str_plural($entity) !!}</strong>.
                                        </li>
                                    @endforeach

                                </ul>
                            </div>
                        </div>
                        <script>
                            window.onload = function () {
                                window.enableFields = function () {
                                    $('[name=name]').prop('disabled', false);
                                    $('[name=description]').prop('disabled', false);
                                };

                                $('.ownershipDropDown a').click(function() {
                                    var className = 'text-info';

                                    if ($(this).text().indexOf(' no') > 0) {
                                        className = 'text-danger';
                                    }

                                    if ($(this).text().indexOf(' any') > 0) {
                                        className = 'text-success';
                                    }

                                    $('#permissions-' + $(this).data('entity') + '-' + $(this).data('action')).val($(this).text().replace($(this).data('action') + ' ', ''));
                                    $('#selected-' + $(this).data('entity') + '-' + $(this).data('action')).text($(this).text())
                                        .removeClass('text-info')
                                        .removeClass('text-success')
                                        .removeClass('text-danger')
                                        .addClass(className);
                                });
                            };
                        </script>

                        @submit('Update Role', ['cancelUrl' => route('genealabs.laravel-governor.roles.index')])
                    @endform

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
            </div>
        @endif
    @endcan
@stop
