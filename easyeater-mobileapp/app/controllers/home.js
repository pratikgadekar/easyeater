var controls = require('controls');

// get main and menu view as objects
var menuView = controls.getMenuView();
var menuList = controls.getMenuList();
var feedbackList = controls.getFeedbackList();
var aboutUs = controls.getAboutUs();
//var lookUpList = controls.getLookUpList();
//var menuAdminList = controls.getMenuAdminList();
var profile = controls.getProfile();
var blank = controls.getBlankView();

// method is exposed by widget

$.drawermenu.init({
	menuview : menuView.getView(),
	mainview : menuList.getView(),
	duration : 200,
	parent : $.home
});

var menuButtonClick = function(data) {
	//alert("pqr");
	$.drawermenu.showhidemenu();

	$.drawermenu.menuOpen = !$.drawermenu.menuOpen;

	if ($.drawermenu.menuOpen == true) {

		$.drawermenu.drawermainview.add(blank.getView());
	}
};
Ti.App.addEventListener('menuButtonClick', menuButtonClick);

blank.blank.addEventListener('click', function(data) {
	//removeEvent();
	$.drawermenu.drawermainview.remove(blank.getView());
	$.drawermenu.showhidemenu();
	$.drawermenu.menuOpen = !$.drawermenu.menuOpen;

});
blank.blank.addEventListener('swipe', function(e) {
	//removeEvent();
	if (e.direction == "left") {

		$.drawermenu.drawermainview.remove(blank.getView());
		$.drawermenu.showhidemenu();
		$.drawermenu.menuOpen = !$.drawermenu.menuOpen;
	}

});
//

function removePages(pageNumber) {

	if (pageNumber == 1) {
		$.drawermenu.drawermainview.remove(menuList.getView());

	} else if (pageNumber == 2) {
		$.drawermenu.drawermainview.remove(feedbackList.getView());

	} else if (pageNumber == 3) {
		$.drawermenu.drawermainview.remove(aboutUs.getView());

	} //else if (pageNumber == 4) {
		//$.drawermenu.drawermainview.remove(lookUpList.getView());

	//} else if (pageNumber == 5) {
		//$.drawermenu.drawermainview.remove(menuAdminList.getView());

	//}
	 else if (pageNumber == 6) {
		$.drawermenu.drawermainview.remove(profile.getView());

	}

}

//variable to controler de open/close slide
var activeView = 1;
applyColor(activeView);

// add event listener in this context
menuView.menuTable.addEventListener('click', function(e) {
	$.drawermenu.drawermainview.remove(blank.getView());
	$.drawermenu.showhidemenu();
	$.drawermenu.menuOpen = false;
	//update menuOpen status to prevent inconsistency.

	if (e.rowData.id === "menuList") {
		removePages(activeView);
		$.drawermenu.drawermainview.add(menuList.getView());
		activeView = 1;
		applyColor(activeView);
	}

	if (e.rowData.id === "feedbackList") {
		removePages(activeView);
		$.drawermenu.drawermainview.add(feedbackList.getView());
		activeView = 2;
		applyColor(activeView);
	}

	if (e.rowData.id === "aboutus") {
		removePages(activeView);
		$.drawermenu.drawermainview.add(aboutUs.getView());
		activeView = 3;
		applyColor(activeView);

	}
// 
	// if (e.rowData.id === "lookupList") {
		// removePages(activeView);
		// $.drawermenu.drawermainview.add(lookUpList.getView());
		// activeView = 4;
		// applyColor(activeView);
// 
	// }
// 
	// if (e.rowData.id === "menuListAdmin") {
		// removePages(activeView);
		// $.drawermenu.drawermainview.add(menuAdminList.getView());
		// activeView = 5;
		// applyColor(activeView);
// 
	// }

	if (e.rowData.id === "profile") {
		removePages(activeView);
		$.drawermenu.drawermainview.add(profile.getView());
		activeView = 6;
		applyColor(activeView);

	}

	// on Android the event is received by the label, so watch out!
	Ti.API.info(e.rowData.id);
});

//$.index.open();

function applyColor(activeView) {
	menuView.menuLabel.color = "#4d4d4d";
	menuView.feedbackLabel.color = "#4d4d4d";
	menuView.aboutUsLabel.color = "#4d4d4d";
	//menuView.lookUpLabel.color = "#4d4d4d";
	//menuView.menuListAdminLabel.color = "#4d4d4d";
	menuView.profileLabelLabel.color = "#4d4d4d";

	menuView.menu_icon.image = "images/icons/icon_menu_128.png";
	menuView.feedback_icon.image = "images/icons/icon_feedback_128.png";
	menuView.aboutus_icon.image = "images/icons/icon_aboutus_128.png";
	//menuView.lookup_icon.image = "images/icons/icon_lookup_128.png";
	//menuView.list_icon.image = "images/icons/icon_list_128.png";
	menuView.profile_icon.image = "images/icons/icon_profile_128.png";

	if (activeView == 1) {
		menuView.menuLabel.color = "#f69a55";
		menuView.menu_icon.image = "images/icons/icon_menu_hover_128.png";

	} else if (activeView == 2) {
		menuView.feedbackLabel.color = "#f69a55";
		menuView.feedback_icon.image = "images/icons/icon_feedback_hover_128.png";

	} else if (activeView == 3) {
		menuView.aboutUsLabel.color = "#f69a55";
		menuView.aboutus_icon.image = "images/icons/icon_aboutus_hover_128.png";

	} //else if (activeView == 4) {
		//menuView.lookUpLabel.color = "#f69a55";
		//menuView.lookup_icon.image = "images/icons/icon_lookup_hover_128.png";

	//} else if (activeView == 5) {
	//	menuView.menuListAdminLabel.color = "#f69a55";
	//	menuView.list_icon.image = "images/icons/icon_list_hover_128.png";

	//}
	 else if (activeView == 6) {
		menuView.profileLabelLabel.color = "#f69a55";
		menuView.profile_icon.image = "images/icons/icon_profile_hover_128.png";

	}

}

if (Parse.User.current()) {
	menuView.profileLabelLabel.text = "Profile";

} else {
	menuView.profileLabelLabel.text = "Login";

}

var loginlogoutsucess = function(data) {
	//alert(data.value);

	if (data.value == 'login') {
		menuView.profileLabelLabel.text = "Profile";

	}

	if (data.value == 'logout') {
		menuView.profileLabelLabel.text = "Login";
	}

};
Ti.App.addEventListener('loginlogoutsucess', loginlogoutsucess);

