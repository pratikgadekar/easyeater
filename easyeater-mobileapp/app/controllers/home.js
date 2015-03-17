var args = arguments[0] || {};

var thisWin=$.home;
var main=Ti.UI.createView({
	backgroundColor: "#fff"
});

// store drawermenu and main in global variable for easy access from menu
Alloy.CFG.drawermenu=$.drawermenu;
Alloy.CFG.main=main;

var menu=Alloy.createController('menu').getView();

$.drawermenu.init({
    menuview:menu,
    mainview:main,
    duration:200,
    parent: $.home
});

$.home.addEventListener('open',function(e){
	var actionBarHelper = require('com.alcoapps.actionbarhelper')($.home);	
	actionBarHelper.setIcon('/drawericonw@2x.png');
	actionBarHelper.setTitle('ActionBar with DrawerMenu');
	actionBarHelper.setUpAction(function(e){
		$.drawermenu.showhidemenu();
	});
	actionBarHelper.displayHomeAsUp(false);
});

