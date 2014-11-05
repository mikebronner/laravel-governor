@extends('genealabs/bones-keeper::master')

@section('innerContent')
<script>
    var userArray = {{ json_encode($userList) }};
</script>
<div class="container">
    <div class="page-header">
        <h1>User Roles</h1>
    </div>
    <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
    @foreach($roles as $role)
        <div class="panel panel-default">
            <div class="panel-heading" role="tab" id="headingOne">
                <h4 class="panel-title">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapse-{{ $role->name }}" aria-expanded="true" aria-controls="collapseOne">
                    {{ str_plural($role->name) }}
                    </a>
                </h4>
            </div>
            <div id="collapse-{{ $role->name }}" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                <div class="panel-body">
                    {{ Form::select('users', $users->lists($displayNameField, $users->first()['primaryKey']), $role->users->lists($users->first()['primaryKey']), ['class' => 'selectize', 'multiple']) }}
                </div>
            </div>
        </div>
    @endforeach
    </div>
</div>
@stop
