$ ->
  getLatestVersion()
  initializeDropDowns()
  initializeCollapsers()
  initializeSelectize()
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

getLatestVersion = () ->
  $.getJSON 'https://api.github.com/repos/GeneaLabs/bones-keeper/releases', (data) ->
    latestVersion = data[0]['tag_name']
    currentVersion = $('#bonesKeeperInstalledVersion').text().replace('v', '')
    if versionIsSmaller currentVersion, latestVersion
      $('#bonesKeeperCurrentVersion').text latestVersion
      $('#bonesKeeperCurrentVersion').addClass('btn-danger')
      $('#bonesKeeperCurrentVersion').parent().attr('href', 'http://github.com/genealabs/bones-keeper')
      $('#bonesKeeperCurrentVersion').parent().removeClass('navbar-text')
      $('#bonesKeeperCurrentVersion').parent().addClass('btn btn-default navbar-btn')
    null
  null

versionIsSmaller = (version1, version2) ->
  result = false
  if typeof version1 isnt 'object'
    version1 = version1.toString().split '.'
  if typeof version2 isnt 'object'
    version2 = version2.toString().split('.')
  for i in [0..(Math.max(version1.length, version2.length))]
    if version1[i] is undefined
      version1[i] = 0
    if version2[i] is undefined
      version2[i] = 0
    if Number(version1[i]) < Number(version2[i])
      result = true
      break
    if version1[i] isnt version2[i]
      break
  result

initializeCollapsers = () ->
  $('.collapse').collapse
    hide: true
  $('.collapse').on 'show', '.collapse', () ->
    console.log 'test'
    $('.collapse.in').collapse 'hide'
    null
  null

initializeSelectize = () ->
  $('.selectize').selectize
    maxItems: null,
    valueField: 'id',
    labelField: 'name',
    searchField: 'name',
    options: window.userArray,
    render:
      item: (item, escape) ->
          '<div><span class="btn btn-primary btn-sm">' + escape(item.name) + '</span></div>'
        , option: (item, escape) ->
          '<div><span class="dropdown-item">' + escape(item.name) + '</span></div>'
