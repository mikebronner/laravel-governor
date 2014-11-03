@extends($layoutView)

@section('content')
    {{ HTML::script('/packages/genealabs/bones-keeper/scripts.js') }}
    <style>
        @import url('/packages/genealabs/bones-keeper/styles.css');
    </style>
    @yield('innerContent')
@stop
