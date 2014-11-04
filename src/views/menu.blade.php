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
      <span class="navbar-brand"><a href="http://genealabs.com" target="_blank"><span class="genea">Genea</span>Labs'</a> Bones/Keeper</span>
    </div>
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li>{{ link_to_route('roles.index', 'Roles') }}</li>
        <li>{{ link_to_route('entities.index', 'Entities') }}</li>
      </ul>
      <span class="nav navbar-nav navbar-right">
        <a href="http://github.com/genealabs/bones-keeper" target="_blank" class="navbar-text"><span id="bonesKeeperInstalledVersion">v0.1</span> <span id="bonesKeeperCurrentVersion" class="badge label-danger"></span></a>
      </span>
    </div>
  </div>
</nav>
