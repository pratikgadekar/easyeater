function Controller() {
    function removePages(pageNumber) {
        1 == pageNumber ? $.drawermenu.drawermainview.remove(menuList.getView()) : 2 == pageNumber ? $.drawermenu.drawermainview.remove(feedbackList.getView()) : 3 == pageNumber ? $.drawermenu.drawermainview.remove(aboutUs.getView()) : 4 == pageNumber ? $.drawermenu.drawermainview.remove(lookUpList.getView()) : 5 == pageNumber ? $.drawermenu.drawermainview.remove(menuAdminList.getView()) : 6 == pageNumber && $.drawermenu.drawermainview.remove(profile.getView());
    }
    function applyColor(activeView) {
        menuView.menuLabel.color = "#4d4d4d";
        menuView.feedbackLabel.color = "#4d4d4d";
        menuView.aboutUsLabel.color = "#4d4d4d";
        menuView.lookUpLabel.color = "#4d4d4d";
        menuView.menuListAdminLabel.color = "#4d4d4d";
        menuView.profileLabelLabel.color = "#4d4d4d";
        1 == activeView ? menuView.menuLabel.color = "#f69a55" : 2 == activeView ? menuView.feedbackLabel.color = "#f69a55" : 3 == activeView ? menuView.aboutUsLabel.color = "#f69a55" : 4 == activeView ? menuView.lookUpLabel.color = "#f69a55" : 5 == activeView ? menuView.menuListAdminLabel.color = "#f69a55" : 6 == activeView && (menuView.profileLabelLabel.color = "#f69a55");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "home";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.home = Ti.UI.createWindow({
        top: 20,
        backgroundColor: "white",
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.UPSIDE_PORTRAIT ],
        navBarHidden: true,
        id: "home"
    });
    $.__views.home && $.addTopLevelView($.__views.home);
    $.__views.drawermenu = Alloy.createWidget("com.alcoapps.drawermenu", "widget", {
        id: "drawermenu",
        __parentSymbol: $.__views.home
    });
    $.__views.drawermenu.setParent($.__views.home);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var controls = require("controls");
    var menuView = controls.getMenuView();
    var menuList = controls.getMenuList();
    var feedbackList = controls.getFeedbackList();
    var aboutUs = controls.getAboutUs();
    var lookUpList = controls.getLookUpList();
    var menuAdminList = controls.getMenuAdminList();
    var profile = controls.getProfile();
    var blank = controls.getBlankView();
    $.drawermenu.init({
        menuview: menuView.getView(),
        mainview: menuList.getView(),
        duration: 200,
        parent: $.home
    });
    var menuButtonClick = function() {
        $.drawermenu.showhidemenu();
        $.drawermenu.menuOpen = !$.drawermenu.menuOpen;
        true == $.drawermenu.menuOpen && $.drawermenu.drawermainview.add(blank.getView());
    };
    Ti.App.addEventListener("menuButtonClick", menuButtonClick);
    blank.blank.addEventListener("click", function() {
        $.drawermenu.drawermainview.remove(blank.getView());
        $.drawermenu.showhidemenu();
        $.drawermenu.menuOpen = !$.drawermenu.menuOpen;
    });
    blank.blank.addEventListener("swipe", function(e) {
        if ("left" == e.direction) {
            $.drawermenu.drawermainview.remove(blank.getView());
            $.drawermenu.showhidemenu();
            $.drawermenu.menuOpen = !$.drawermenu.menuOpen;
        }
    });
    var activeView = 1;
    applyColor(activeView);
    menuView.menuTable.addEventListener("click", function(e) {
        $.drawermenu.drawermainview.remove(blank.getView());
        $.drawermenu.showhidemenu();
        $.drawermenu.menuOpen = false;
        if ("menuList" === e.rowData.id) {
            removePages(activeView);
            $.drawermenu.drawermainview.add(menuList.getView());
            activeView = 1;
            applyColor(activeView);
        }
        if ("feedbackList" === e.rowData.id) {
            removePages(activeView);
            $.drawermenu.drawermainview.add(feedbackList.getView());
            activeView = 2;
            applyColor(activeView);
        }
        if ("aboutus" === e.rowData.id) {
            removePages(activeView);
            $.drawermenu.drawermainview.add(aboutUs.getView());
            activeView = 3;
            applyColor(activeView);
        }
        if ("lookupList" === e.rowData.id) {
            removePages(activeView);
            $.drawermenu.drawermainview.add(lookUpList.getView());
            activeView = 4;
            applyColor(activeView);
        }
        if ("menuListAdmin" === e.rowData.id) {
            removePages(activeView);
            $.drawermenu.drawermainview.add(menuAdminList.getView());
            activeView = 5;
            applyColor(activeView);
        }
        if ("profile" === e.rowData.id) {
            removePages(activeView);
            $.drawermenu.drawermainview.add(profile.getView());
            activeView = 6;
            applyColor(activeView);
        }
        Ti.API.info(e.rowData.id);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;