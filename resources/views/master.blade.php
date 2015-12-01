@if (! View::exists('spark::welcome'))
    @extends(config('genealabs-laravel-governor.layoutView'))
@endif

@section(config('genealabs-laravel-governor.bladeContentSection'))
    <script>
        var governorDisplayNameField = '<?= config('genealabs-laravel-governor.displayNameField') ?>';
    </script>
    <script src="{!! asset('genealabs-laravel-governor/js/scripts.js') !!}"></script>
    <script src="{!! asset('genealabs-laravel-governor/js/selectize.min.js') !!}"></script>
    <style>
        @import url('{!! asset('genealabs-laravel-governor/css/selectize.bootstrap3.css') !!}');
        @import url('{!! asset('genealabs-laravel-governor/css/styles.css') !!}');
    </style>
    <div class="container">
        @yield('innerContent')
    </div>
@stop
