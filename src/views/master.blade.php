@extends(config('genealabs-bones-keeper.layoutView'))

@section('content')
    <script src="{!! asset('genealabs/bones-keeper/js/scripts.js') !!}"></script>
    <script src="{!! asset('genealabs/bones-keeper/js/selectize.min.js') !!}"></script>
    <style>
        @import url('{!! asset('genealabs/bones-keeper/css/selectize.bootstrap3.css') !!}');
        @import url('{!! asset('genealabs/bones-keeper/css/styles.css') !!}');
    </style>
    <div class="container">
        <div class="col-sm-2">
            @include('genealabs-bones-keeper::menu')
        </div>
        <div class="col-sm-10">
            @yield('innerContent')
        </div>
    </div>
@stop
