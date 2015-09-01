(function() {
  var getLatestVersion, initializeCollapsers, initializeDropDowns, initializeSelectize, versionIsSmaller;

  $(function() {
    initializeDropDowns();
    initializeCollapsers();
    initializeSelectize();

    return null;
  });

  initializeDropDowns = function() {
    $('.ownershipDropDown a').click(function() {
      $('#permissions-' + $(this).data('entity') + '-' + $(this).data('action')).val($(this).text());
      $('#selected-' + $(this).data('entity') + '-' + $(this).data('action')).text($(this).text());
      return null;
    });
    return null;
  };

  window.submitForm = function(form) {
    form.submit();
    return null;
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
      labelField: window[governorDisplayNameField],
      searchField: window[governorDisplayNameField],
      render: {
        item: function(item, escape) {
          return '<div><span class="btn btn-primary btn-sm">' + escape(item.name) + '</span></div>';
        },
        option: function(item, escape) {
          return '<div><span class="dropdown-item">' + escape(item.name) + '</span></div>';
        }
      }
    });
  };

}).call(this);
