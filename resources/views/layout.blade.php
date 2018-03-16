@extends(config('genealabs-laravel-governor.layout-view'))

@section(config('genealabs-laravel-governor.content-section'))
    @if (str_contains("bootstrap", config("genealabs-laravel-governor.framework")))
        <div class="container">
    @endif

        @include ("genealabs-laravel-governor::" . config("genealabs-laravel-governor.framework") . "-menu")

        @yield('governorContent')

    @if (str_contains("bootstrap", config("genealabs-laravel-governor.framework")))
        </div>
    @endif
@endsection
