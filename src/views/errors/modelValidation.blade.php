@extends('genealabs-bones-keeper::master')

@section('innerContent')
    <div class="page-header">
        <h1>Data Integrity Failure</h1>
    </div>
    <p class="lead">The following data integrity requirements were not met. Please notify your administrator of this issue.</p>
    <div class="alert alert-danger">
        <ul>
        @foreach($errors->all('<li>:message</li>') as $message)
            {{ $message }}
        @endforeach
        </ul>
    </div>
@stop
