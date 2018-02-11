@extends ('layouts.app')

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Reset Password</div>
                    <div class="panel-body">
                        @form(['route' => 'password-reset', 'framework' => 'bootstrap3', 'role' => 'form', 'labelWidth' => 4, 'fieldWidth' => 6])
                        @hidden('token', $token)
                        @email('email')
                        @password('password')
                        @password('password_confirmation')
                        @submit('Reset Password')
                        @endform
                        {{-- {!! Form::bs_open(['route' => 'password-reset', 'class' => 'form-horizontal', 'role' => 'form'], $errors, 4, 6) !!}
                        {!! Form::hidden('token', $token) !!}
                        {!! Form::bs_email('E-Mail Address', 'email', old('email'), ['class' => 'form-control']) !!}
                        {!! Form::bs_password('Password', 'password', ['class' => 'form-control']) !!}
                        {!! Form::bs_password('Confirm Password', 'password_confirmation', ['class' => 'form-control']) !!}
                        {!! Form::bs_submit('Reset Password', null, ['class' => 'btn btn-primary']) !!}
                        {!! Form::close() !!} --}}
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
