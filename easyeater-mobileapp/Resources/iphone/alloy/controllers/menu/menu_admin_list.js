function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "menu/menu_admin_list";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.menuAdminList = Ti.UI.createWindow({
        top: 20,
        backgroundColor: "#ffffff",
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.UPSIDE_PORTRAIT ],
        navBarHidden: true,
        id: "menuAdminList"
    });
    $.__views.menuAdminList && $.addTopLevelView($.__views.menuAdminList);
    $.__views.topViewBack = Alloy.createController("top_view_back", {
        id: "topViewBack",
        __parentSymbol: $.__views.menuAdminList
    });
    $.__views.topViewBack.setParent($.__views.menuAdminList);
    $.__views.__alloyId14 = Ti.UI.createView({
        height: "40dp",
        top: "50dp",
        layout: "horizontal",
        id: "__alloyId14"
    });
    $.__views.menuAdminList.add($.__views.__alloyId14);
    $.__views.vegTab = Ti.UI.createView({
        width: "50%",
        backgroundColor: "#ffffff",
        id: "vegTab"
    });
    $.__views.__alloyId14.add($.__views.vegTab);
    $.__views.__alloyId15 = Ti.UI.createLabel({
        height: "20dp",
        font: {
            fontSize: "12dp"
        },
        color: "#4d4d4d",
        text: "Veg",
        id: "__alloyId15"
    });
    $.__views.vegTab.add($.__views.__alloyId15);
    $.__views.vegselected = Ti.UI.createView({
        bottom: "0",
        height: "3dp",
        backgroundColor: "f69a55",
        id: "vegselected"
    });
    $.__views.vegTab.add($.__views.vegselected);
    $.__views.nonvegTab = Ti.UI.createView({
        width: "50%",
        backgroundColor: "#ffffff",
        id: "nonvegTab"
    });
    $.__views.__alloyId14.add($.__views.nonvegTab);
    $.__views.__alloyId16 = Ti.UI.createLabel({
        height: "20dp",
        font: {
            fontSize: "12dp"
        },
        color: "#4d4d4d",
        text: "Non veg",
        id: "__alloyId16"
    });
    $.__views.nonvegTab.add($.__views.__alloyId16);
    $.__views.nonvegselected = Ti.UI.createView({
        bottom: "0",
        height: "3dp",
        backgroundColor: "f69a55",
        visible: "false",
        id: "nonvegselected"
    });
    $.__views.nonvegTab.add($.__views.nonvegselected);
    var __alloyId17 = [];
    $.__views.view1 = Ti.UI.createView({
        id: "view1"
    });
    __alloyId17.push($.__views.view1);
    $.__views.__alloyId18 = Ti.UI.createLabel({
        text: "View 1",
        id: "__alloyId18"
    });
    $.__views.view1.add($.__views.__alloyId18);
    $.__views.view2 = Ti.UI.createView({
        id: "view2"
    });
    __alloyId17.push($.__views.view2);
    $.__views.__alloyId19 = Ti.UI.createLabel({
        text: "View 2",
        id: "__alloyId19"
    });
    $.__views.view2.add($.__views.__alloyId19);
    $.__views.scrollableView = Ti.UI.createScrollableView({
        views: __alloyId17,
        id: "scrollableView",
        showPagingControl: "false",
        top: "100dp"
    });
    $.__views.menuAdminList.add($.__views.scrollableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.menuAdminList.left = Ti.Platform.displayCaps.platformWidth;
    $.topViewBack.headerLabel.text = "Menu";
    $.topViewBack.menuImgView.addEventListener("click", function() {
        $.menuAdminList.close(slide_it_right);
    });
    $.topViewBack.addView.addEventListener("click", function() {
        Alloy.createController("menu/add").getView().open(slide_it_left);
    });
    $.vegTab.addEventListener("click", function() {
        $.scrollableView.scrollToView(0);
        $.nonvegselected.visible = false;
        $.vegselected.visible = true;
    });
    $.nonvegTab.addEventListener("click", function() {
        $.scrollableView.scrollToView(1);
        $.vegselected.visible = false;
        $.nonvegselected.visible = true;
    });
    $.scrollableView.addEventListener("scrollend", function(e) {
        Ti.API.info(e.currentPage);
        if (0 == e.currentPage) {
            $.nonvegselected.visible = false;
            $.vegselected.visible = true;
        }
        if (1 == e.currentPage) {
            $.vegselected.visible = false;
            $.nonvegselected.visible = true;
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;