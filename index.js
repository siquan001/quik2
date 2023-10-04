(function(){
  var util=_REQUIRE_('./js/util.js');
  var storage=_REQUIRE_('./js/storage.js');
  var dialog=_REQUIRE_('./js/dialog.js');
  var menu=_REQUIRE_('./js/menu.js');
  var iconc=_REQUIRE_('./js/iconc.js');
  var setting=_REQUIRE_('./js/setting.js');
  var omnibox=_REQUIRE_('./js/omnibox.js');
  var omniboxUI=_REQUIRE_('./js/omnibox_ui.js');
  var link=_REQUIRE_('./js/link.js');
  var linkUI=_REQUIRE_('./js/link_ui.js');
  var says=_REQUIRE_('./js/says.js');

  window.quik={
    storage:storage,
    omnibox:omnibox,
    util:util,
    omniboxUI:omniboxUI,
    link:link,
    linkUI:linkUI,
    dialog:dialog,
    says:says,
    menu:menu,
    setting:setting,
    iconc:iconc
  }
  document.querySelector("main").style.opacity='';
})();