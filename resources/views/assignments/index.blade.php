@extends('genealabs-laravel-governor::layout')

@section('governorContent')
    <div class="panel panel-default">
        <div class="panel-heading">
            Roles Management > Assign Users
        </div>
        <div class="panel-body">
            @form(['route' => 'genealabs.laravel-governor.assignments.store', 'framework' => 'bootstrap3'])
                @can('view', $assignment)
                    @foreach($roles as $role)
                        @combobox(
                            'users[' . $role->name . '][]',
                            $users->pluck($displayNameField, $users->first()->getKeyName())->toArray(),
                            $role->users->pluck($users->first()->getKeyName())->toArray(),
                            [
                                'label' => $role->users()->count() . ' ' . (($role->users()->count() != 1) ? str_plural($role->name) : str_singular($role->name)),
                                'multiple' => 'multiple',
                                'disabled' => ((auth()->user()->can('edit', $assignment)) ? '' : 'disabled')
                            ]
                        )
                    @endforeach
                @endcan

                @can('edit', $assignment)
                    @submit('Save User Assignments', ['class' => 'btn btn-primary'])
                @endcan
            @endform
        </div>
    </div>
@stop
