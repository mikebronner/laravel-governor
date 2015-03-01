<nav class="navbar navbar-default bones-keeper" role="navigation">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-brand">Bones:Keeper</div>
        <ul class="nav nav-pills">
            <li>{!! link_to_route('entities.index', 'Entities') !!}</li>
            <li>{!! link_to_route('roles.index', 'Roles') !!}</li>
            <li>{!! link_to_route('assignments.index', 'Assignments') !!}</li>
        </ul>
      <span class="nav navbar-nav navbar-right">
        <a href="http://github.com/genealabs/bones-keeper" target="_blank" class="navbar-text"><span id="bonesKeeperInstalledVersion">v0.13.3</span> <span id="bonesKeeperCurrentVersion" class="badge label-danger"></span></a>
      </span>
  </div>
</nav>

