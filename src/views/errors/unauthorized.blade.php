@extends('genealabs-bones-keeper::master')

@section('innerContent')
    <div class="panel panel-danger">
        <div class="panel-heading">Access Forbidden</div>
        <div class="panel-body">
            You're not supposed to be here. {{ link_to('/', 'Try the home page.', ['class' => 'btn btn-success']) }}
        </div>
    </div>
@stop
