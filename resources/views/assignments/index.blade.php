@extends('genealabs-laravel-governor::master')

@section('innerContent')
    <div class="panel panel-default">
        <div class="panel-heading">
            Roles Management > Assign Users
        </div>
        <div class="panel-body">
    {!! Form::open(['route' => 'genealabs.laravel-governor.assignments.store']) !!}
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
                        {!! Form::select('users[' . $role->name . '][]', $users->lists($displayNameField, $users->first()['primaryKey'])->toArray(), $role->users->lists($users->first()['primaryKey'])->toArray(), ['class' => 'selectize', 'multiple', ((Auth::user()->can('edit', $assignment)) ? '' : 'disabled')]) !!}
                    </div>
                </div>
            </div>
        @endforeach
        </div>
        @endcan
        @can('edit', $assignment)
        {!! Form::submit('Save User Assignments', ['class' => 'btn btn-primary']) !!}
        @endcan
    {!! Form::close() !!}
    </div>
    </div>
@stop
