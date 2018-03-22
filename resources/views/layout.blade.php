@extends(config('genealabs-laravel-governor.layout-view'))

@section(config('genealabs-laravel-governor.content-section'))
    <div class="container">

        @include ("genealabs-laravel-governor::menu")

        @yield('governorContent')

    </div>
@endsection
