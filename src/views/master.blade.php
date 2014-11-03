@extends($layoutView)

@section('content')
    {{ HTML::script('/packages/genealabs/bones-keeper/js/scripts.js') }}
    <style>
        @import url('/packages/genealabs/bones-keeper/css/styles.css');
    </style>
    @yield('innerContent')
@stop
