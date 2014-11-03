$ ->
  initializeDropDowns()
  null

initializeDropDowns = () ->
  $('.ownershipDropDown a').click ->
    $('#permissions-' + $(this).data('entity') + '-' + $(this).data('action')).val $(this).text()
    $('#selected-' + $(this).data('entity') + '-' + $(this).data('action')).text $(this).text()
    null
  null

window.submitForm = (form) ->
  form.submit();
  null
