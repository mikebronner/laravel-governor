@extends($layoutView)

@section('content')
<div class="container">
    <div class="page-header">
        {{ link_to_route('roles.create', 'Add New Role', null, ['class' => 'btn btn-default pull-right']) }}
        <h1>Roles</h1>
    </div>
    <div class="list-group">
    @foreach($roles as $role)
        <a href="#" class="list-group-item">
            <h4 class="list-group-item-heading">{{ $role->name }}</h4>
            <p class="list-group-item-text">{{ $role->description }}</p>
        </a>
    @endforeach
    </div>
</div>
@stop
