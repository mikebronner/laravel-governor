@extends ('layouts.app')

@section('content')
<div class="container-fluid">
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			<div class="panel panel-default">
				<div class="panel-heading">Reset Password</div>
				<div class="panel-body">
					@if (session('status'))
						<div class="alert alert-success">
							{{ session('status') }}
						</div>
					@endif

					@if (count($errors) > 0)
						<div class="alert alert-danger">
							<strong>Whoops!</strong> There were some problems with your input.<br><br>
							<ul>
								@foreach ($errors->all() as $error)
									<li>{{ $error }}</li>
								@endforeach
							</ul>
						</div>
					@endif
                    @form(['route' => 'email-reminder', 'framework' => 'bootstrap3', 'role' => 'form', 'labelWidth' => 4, 'fieldWidth' => 6])
                    @email('email')
                    @submit('Send Password Reset Link')
                    @endform
                        {{-- {!! Form::bs_open(['route' => 'email-reminder', 'class' => 'form-horizontal', 'role' => 'form'], $errors, 4, 6) !!}
                        {!! Form::bs_email('E-Mail Address', 'email', old('email'), ['class' => 'form-control']) !!}
                        {!! Form::bs_submit('Send Password Reset Link', null, ['class' => 'btn btn-primary']) !!}
                        {!! Form::close() !!} --}}
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
