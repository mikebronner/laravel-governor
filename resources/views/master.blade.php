@extends(config('genealabs-laravel-governor.layoutView'))

@section(config('genealabs-laravel-governor.cssHeaderSection'))
    <style>
        @import url('{!! asset('genealabs-laravel-governor/css/selectize.bootstrap3.css') !!}');
        @import url('{!! asset('genealabs-laravel-governor/css/styles.css') !!}');
    </style>
    <script>
        var governorDisplayNameField = '{{ config('genealabs-laravel-governor.displayNameField') }}';
    </script>
@endsection

@section(config('genealabs-laravel-governor.contentSection'))
    <div class="container">
        @yield('innerContent')
    </div>
@endsection

@section(config('genealabs-laravel-governor.jsFooterSection'))
    <script src="{!! asset('genealabs-laravel-governor/js/scripts.js') !!}"></script>
    <script src="{!! asset('genealabs-laravel-governor/js/selectize.min.js') !!}"></script>
@endsection
