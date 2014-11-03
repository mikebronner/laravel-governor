<nav class="navbar navbar-default" role="navigation">
  <div class="container">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <span class="navbar-brand"><a href="http://genealabs.com"><span class="genea">Genea</span>Labs'</a> Bones/Keeper</span>
    </div>
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li>{{ link_to_route('roles.index', 'Roles') }}</li>
        <li>{{ link_to_route('permissions.index', 'Permissions') }}</li>
      </ul>
    </div>
  </div>
</nav>
