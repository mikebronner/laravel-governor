@extends('bones-keeper::master')

@section('innerContent')
    {{ Form::open(['route' => 'assignments.store']) }}
        <div class="page-header">
            @if (Auth::check() && Auth::user()->hasPermissionTo('change', 'any', 'assignment'))
            {{ Form::submit('Save User Roles', ['class' => 'btn btn-success btn-lg pull-right']) }}
            @endif
            <h1>User Roles</h1>
        </div>
        @if (Auth::check() && Auth::user()->hasPermissionTo('view', 'any', 'assignment'))
        <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
        @foreach($roles as $role)
            <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="headingOne">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapse-{{ Str::slug($role->name) }}" aria-expanded="true" aria-controls="collapseOne">
                        {{ $role->users()->count() . ' ' . (($role->users()->count() != 1) ? str_plural($role->name) : str_singular($role->name)) }}
                        </a>
                    </h4>
                </div>
                <div id="collapse-{{ Str::slug($role->name) }}" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                    <div class="panel-body">
                        {{ Form::select('users[' . $role->name . '][]', $users->lists($displayNameField, $users->first()['primaryKey']), $role->users->lists($users->first()['primaryKey']), ['class' => 'selectize', 'multiple', ((Auth::user()->hasPermissionTo('change', 'any', 'assignment')) ? '' : 'disabled')]) }}
                    </div>
                </div>
            </div>
        @endforeach
        </div>
        @endif
    {{ Form::close() }}
@stop
