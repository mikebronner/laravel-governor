    @extends('genealabs-laravel-governor::master')

    @section('innerContent')
        <h1 class="page-header">Edit Entities</h1>
        @can('edit', $entity)
        <div class="well">
        {!! Form::model($entity, ['route' => ['genealabs.laravel-governor.entities.update', $entity->name], 'method' => 'PATCH', 'class' => 'form-horizontal', 'id' => 'editForm']) !!}
            <div class="form-group{{ (count($errors) > 0) ? (($errors->has('name')) ? ' has-feedback has-error' : ' has-feedback has-success') : '' }}">
                {!! Form::label('name', 'Entity', ['class' => 'control-label col-sm-2']) !!}
                <div class="col-sm-5">
                    {!! Form::text('name', null, ['class' => 'form-control']) !!}
                    @if (count($errors))
                    <span class="glyphicon {{ ($errors->has('name')) ? ' glyphicon-remove' : ' glyphicon-ok' }} form-control-feedback"></span>
                    @endif
                </div>
                {!! $errors->first('name', '<span class="help-block col-sm-5">:message</span>') !!}
            </div>
        {!! Form::close() !!}
        {!! Form::open(['route' => ['genealabs.laravel-governor.entities.destroy', $entity->name], 'method' => 'DELETE', 'class' => 'form-horizontal', 'id' => 'deleteForm']) !!}
        {!! Form::close() !!}
            <div class="form-horizontal">
                <div class="form-group">
                    <div class="col-sm-2">
                        {!! link_to_route('genealabs.laravel-governor.entities.index', 'Cancel', [], ['class' => 'btn btn-default pull-left']) !!}
                    </div>
                    <div class="col-sm-10 btn-group">
                        {!! Form::button('Update Entity', ['class' => 'btn btn-success', 'onclick' => 'submitForm($("#editForm"));']) !!}
                        {!! Form::button('Delete Entity', ['class' => 'btn btn-danger', 'data-toggle' => 'modal', 'data-target' => '#deleteModal']) !!}
                    </div>
                </div>
            </div>
        </div>
    <div class="modal" id="deleteModal">
        <div class="modal-dialog">
            <div class="modal-content panel-danger">
                <div class="modal-header panel-heading">
                    <h4 class="modal-title">Delete this Entity?</h4>
                </div>
                <div class="modal-body">
                    <p>Entities are fickle things: if you continue, this one will leave you forever.</p>
                </div>
                <div class="modal-footer panel-footer">
                    <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger pull-right" onclick="submitForm($('#deleteForm'));">Delete Entity</button>
                </div>
            </div>
        </div>
    </div>
    @endcan
@stop
