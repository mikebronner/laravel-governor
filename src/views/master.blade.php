@extends(Config::get('genealabs.bones-keeper.layoutView'))

@section('content')
    {!! HTML::script('/genealabs/bones-keeper/js/scripts.js') !!}
    {!! HTML::script('/genealabs/bones-keeper/js/selectize.min.js') !!}
    <style>
        @import url('/genealabs/bones-keeper/css/selectize.bootstrap3.css');
        @import url('/genealabs/bones-keeper/css/styles.css');
    </style>
    <div class="container">
        <div class="col-sm-2">
            @include('bones-keeper::menu')
        </div>
        <div class="col-sm-10">
            @yield('innerContent')
        </div>
    </div>
@stop
