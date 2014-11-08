@extends(Config::get('bones-keeper::layoutView'))

@section('content')
    {{ HTML::script('/packages/genealabs/bones-keeper/js/scripts.js') }}
    {{ HTML::script('/packages/genealabs/bones-keeper/js/selectize.min.js') }}
    <style>
        @import url('/packages/genealabs/bones-keeper/css/selectize.bootstrap3.css');
        @import url('/packages/genealabs/bones-keeper/css/styles.css');
    </style>
    <div class="container">
        @include('bones-keeper::menu')
        @yield('innerContent')
    </div>
@stop
