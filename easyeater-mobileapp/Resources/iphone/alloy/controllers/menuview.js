function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "menuview";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.menuView = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "blue",
        id: "menuView"
    });
    $.__views.menuView && $.addTopLevelView($.__views.menuView);
    var __alloyId1 = [];
    $.__views.menuList = Ti.UI.createTableViewRow({
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        height: "50dp",
        id: "menuList"
    });
    __alloyId1.push($.__views.menuList);
    $.__views.rowContainer = Ti.UI.createView({
        height: "30dp",
        layout: "horizontal",
        id: "rowContainer"
    });
    $.__views.menuList.add($.__views.rowContainer);
    $.__views.menu_icon = Ti.UI.createImageView({
        left: 15,
        height: "25dp",
        width: "25dp",
        image: "images/icons/icon_menu_128.png",
        id: "menu_icon"
    });
    $.__views.rowContainer.add($.__views.menu_icon);
    $.__views.menuListView = Ti.UI.createView({
        left: 10,
        width: "20dp",
        height: "20dp",
        id: "menuListView"
    });
    $.__views.rowContainer.add($.__views.menuListView);
    $.__views.menuLabel = Ti.UI.createLabel({
        height: "20dp",
        font: {
            fontSize: "14sp"
        },
        color: "#4d4d4d",
        text: "Menu",
        id: "menuLabel"
    });
    $.__views.rowContainer.add($.__views.menuLabel);
    $.__views.__alloyId2 = Ti.UI.createView({
        backgroundColor: "#d5d5d5",
        height: "0.5dp",
        width: "100%",
        bottom: "0dp",
        id: "__alloyId2"
    });
    $.__views.menuList.add($.__views.__alloyId2);
    $.__views.feedbackList = Ti.UI.createTableViewRow({
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        height: "50dp",
        id: "feedbackList"
    });
    __alloyId1.push($.__views.feedbackList);
    $.__views.rowContainer = Ti.UI.createView({
        height: "30dp",
        layout: "horizontal",
        id: "rowContainer"
    });
    $.__views.feedbackList.add($.__views.rowContainer);
    $.__views.feedback_icon = Ti.UI.createImageView({
        left: 15,
        height: "25dp",
        width: "25dp",
        image: "images/icons/icon_feedback_128.png",
        id: "feedback_icon"
    });
    $.__views.rowContainer.add($.__views.feedback_icon);
    $.__views.feedbackListView = Ti.UI.createView({
        left: 10,
        width: "20dp",
        height: "20dp",
        id: "feedbackListView"
    });
    $.__views.rowContainer.add($.__views.feedbackListView);
    $.__views.feedbackLabel = Ti.UI.createLabel({
        height: "20dp",
        font: {
            fontSize: "14sp"
        },
        color: "#4d4d4d",
        text: "Feedback",
        id: "feedbackLabel"
    });
    $.__views.rowContainer.add($.__views.feedbackLabel);
    $.__views.__alloyId3 = Ti.UI.createView({
        backgroundColor: "#d5d5d5",
        height: "0.5dp",
        width: "100%",
        bottom: "0dp",
        id: "__alloyId3"
    });
    $.__views.feedbackList.add($.__views.__alloyId3);
    $.__views.aboutus = Ti.UI.createTableViewRow({
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        height: "50dp",
        id: "aboutus"
    });
    __alloyId1.push($.__views.aboutus);
    $.__views.rowContainer = Ti.UI.createView({
        height: "30dp",
        layout: "horizontal",
        id: "rowContainer"
    });
    $.__views.aboutus.add($.__views.rowContainer);
    $.__views.aboutus_icon = Ti.UI.createImageView({
        left: 15,
        height: "25dp",
        width: "25dp",
        image: "images/icons/icon_aboutus_128.png",
        id: "aboutus_icon"
    });
    $.__views.rowContainer.add($.__views.aboutus_icon);
    $.__views.aboutusView = Ti.UI.createView({
        left: 10,
        width: "20dp",
        height: "20dp",
        id: "aboutusView"
    });
    $.__views.rowContainer.add($.__views.aboutusView);
    $.__views.aboutUsLabel = Ti.UI.createLabel({
        height: "20dp",
        font: {
            fontSize: "14sp"
        },
        color: "#4d4d4d",
        text: "About Us",
        id: "aboutUsLabel"
    });
    $.__views.rowContainer.add($.__views.aboutUsLabel);
    $.__views.__alloyId4 = Ti.UI.createView({
        backgroundColor: "#d5d5d5",
        height: "0.5dp",
        width: "100%",
        bottom: "0dp",
        id: "__alloyId4"
    });
    $.__views.aboutus.add($.__views.__alloyId4);
    $.__views.profile = Ti.UI.createTableViewRow({
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        height: "50dp",
        id: "profile"
    });
    __alloyId1.push($.__views.profile);
    $.__views.rowContainer = Ti.UI.createView({
        height: "30dp",
        layout: "horizontal",
        id: "rowContainer"
    });
    $.__views.profile.add($.__views.rowContainer);
    $.__views.profile_icon = Ti.UI.createImageView({
        left: 15,
        height: "25dp",
        width: "25dp",
        image: "images/icons/icon_profile_128.png",
        id: "profile_icon"
    });
    $.__views.rowContainer.add($.__views.profile_icon);
    $.__views.profileView = Ti.UI.createView({
        left: 10,
        width: "20dp",
        height: "20dp",
        id: "profileView"
    });
    $.__views.rowContainer.add($.__views.profileView);
    $.__views.profileLabelLabel = Ti.UI.createLabel({
        height: "20dp",
        font: {
            fontSize: "14sp"
        },
        color: "#4d4d4d",
        text: "Login",
        id: "profileLabelLabel"
    });
    $.__views.rowContainer.add($.__views.profileLabelLabel);
    $.__views.__alloyId5 = Ti.UI.createView({
        backgroundColor: "#d5d5d5",
        height: "0.5dp",
        width: "100%",
        bottom: "0dp",
        id: "__alloyId5"
    });
    $.__views.profile.add($.__views.__alloyId5);
    $.__views.menuTable = Ti.UI.createTableView({
        separatorStyle: "NONE",
        separatorColor: "transparent",
        backgroundColor: "#ffffff",
        data: __alloyId1,
        id: "menuTable"
    });
    $.__views.menuView.add($.__views.menuTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;