(function() {
  var getLatestVersion, initializeCollapsers, initializeDropDowns, initializeSelectize, versionIsSmaller;

  $(function() {
    initializeDropDowns();
    initializeCollapsers();
    initializeSelectize();
  });

  initializeDropDowns = function() {
    $('.ownershipDropDown a').click(function() {
        var className = 'text-info';

        if ($(this).text().indexOf(' no') > 0) {
            className = 'text-danger';
        }
        console.log($(this).text().indexOf(' no'));
        console.log($(this).text().indexOf(' any'));
        if ($(this).text().indexOf(' any') > 0) {
            className = 'text-success';
        }
        console.log(className);

        $('#permissions-' + $(this).data('entity') + '-' + $(this).data('action')).val($(this).text());
        $('#selected-' + $(this).data('entity') + '-' + $(this).data('action')).text($(this).text())
            .removeClass('text-info')
            .removeClass('text-success')
            .removeClass('text-danger')
            .addClass(className);
    });
  };

  window.submitForm = function(form) {
    form.submit();
  };

  initializeCollapsers = function() {
    $('.collapse').collapse({
      hide: true
    });
    $('.collapse').on('show', '.collapse', function() {
      console.log('test');
      $('.collapse.in').collapse('hide');
      return null;
    });
    return null;
  };

  initializeSelectize = function() {
    return $('.selectize').selectize({
      maxItems: null,
      valueField: 'id',
      labelField: window.governorDisplayNameField,
      searchField: window.governorDisplayNameField,
      render: {
        item: function(item, escape) {
          return '<div><span class="btn btn-primary btn-sm">' + escape(item[window.governorDisplayNameField]) + '</span></div>';
        },
        option: function(item, escape) {
          return '<div><span class="dropdown-item">' + escape(item[window.governorDisplayNameField]) + '</span></div>';
        }
      }
    });
  };

}).call(this);
