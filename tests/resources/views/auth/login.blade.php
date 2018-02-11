@extends ('layouts.app')

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Login</div>
                    <div class="panel-body">
                        @form (['route' => 'login', 'class' => 'form-horizontal', 'role' => 'form', 'framework' => 'bootstrap3'])
                            @email ('email', null, ['label' => 'Email Address'])
                            @password ('password')
                            @checkbox ('remember', 1, null, ['label' => 'Remember Me'])
                            @submit ('Log In', ['cancelUrl' => url()->previous()])
                        @endform
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
