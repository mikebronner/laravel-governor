@extends('genealabs-bones-keeper::master')

@section('innerContent')
    {!! Form::open(['route' => 'assignments.store']) !!}
        <div class="page-header">
            @can('edit', $assignment)
            {!! Form::submit('Save User Roles', ['class' => 'btn btn-success btn-lg pull-right']) !!}
            @endcan
            <h1>User Roles</h1>
        </div>
        @can('view', $assignment)
        <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
        @foreach($roles as $role)
            <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingOne">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapse-{{ str_slug($role->name) }}" aria-expanded="true" aria-controls="collapseOne">
                        {{ $role->users()->count() . ' ' . (($role->users()->count() != 1) ? str_plural($role->name) : str_singular($role->name)) }}
                        </a>
                    </h4>
                </div>
                <div id="collapse-{{ str_slug($role->name) }}" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                    <div class="panel-body">
                        {!! Form::select('users[' . $role->name . '][]', $users->lists($displayNameField, $users->first()['primaryKey']), $role->users->lists($users->first()['primaryKey']), ['class' => 'selectize', 'multiple', ((Auth::user()->can('edit', $assignment)) ? '' : 'disabled')]) !!}
                    </div>
                </div>
            </div>
        @endforeach
        </div>
        @endcan
    {!! Form::close() !!}
@stop
