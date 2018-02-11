@extends ('layouts.app')

@section('content')
<div class="container-fluid">
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			<div class="panel panel-default">
				<div class="panel-heading">Register</div>
				<div class="panel-body">

                    @form(['route' => 'register', 'class' => 'form-horizontal', 'role' => 'form', 'labelWidth' => 4, 'fieldWidth' => 6])
                        {{-- TODO: add timezone combobox --}}
                        @hidden ('timezone', null, ['id' => 'timezone'])
                        @text ('name')
                        @email ('email')
                        @password ('password')
                        @password ('password_confirmation')
                        @submit ('Register')
                    @endform

				</div>
			</div>
		</div>
	</div>
</div>
@endsection

@section ('footer-js')
    <script>
        $(document).ready(function () {
            $('#timezone').val(timezone.determine().name());
        });
    </script>
@endsection
