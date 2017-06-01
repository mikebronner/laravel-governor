@extends(config('genealabs-laravel-governor.layoutView'))

@section(config('genealabs-laravel-governor.contentSection'))
    <div class="container">

        @include('genealabs-laravel-governor::menu')

        @yield('governorContent')

    </div>
@endsection
