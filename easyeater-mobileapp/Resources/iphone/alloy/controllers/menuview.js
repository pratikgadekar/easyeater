function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "menuview";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.menuView = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "blue",
        id: "menuView"
    });
    $.__views.menuView && $.addTopLevelView($.__views.menuView);
    var __alloyId0 = [];
    $.__views.menuList = Ti.UI.createTableViewRow({
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        height: "40dp",
        id: "menuList"
    });
    __alloyId0.push($.__views.menuList);
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
            fontSize: "12dp"
        },
        color: "#4d4d4d",
        text: "Menu",
        id: "menuLabel"
    });
    $.__views.rowContainer.add($.__views.menuLabel);
    $.__views.__alloyId1 = Ti.UI.createView({
        backgroundColor: "#d5d5d5",
        height: "0.5dp",
        width: "100%",
        bottom: "0dp",
        id: "__alloyId1"
    });
    $.__views.menuList.add($.__views.__alloyId1);
    $.__views.feedbackList = Ti.UI.createTableViewRow({
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        height: "40dp",
        id: "feedbackList"
    });
    __alloyId0.push($.__views.feedbackList);
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
            fontSize: "12dp"
        },
        color: "#4d4d4d",
        text: "Feedback",
        id: "feedbackLabel"
    });
    $.__views.rowContainer.add($.__views.feedbackLabel);
    $.__views.__alloyId2 = Ti.UI.createView({
        backgroundColor: "#d5d5d5",
        height: "0.5dp",
        width: "100%",
        bottom: "0dp",
        id: "__alloyId2"
    });
    $.__views.feedbackList.add($.__views.__alloyId2);
    $.__views.aboutus = Ti.UI.createTableViewRow({
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        height: "40dp",
        id: "aboutus"
    });
    __alloyId0.push($.__views.aboutus);
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
            fontSize: "12dp"
        },
        color: "#4d4d4d",
        text: "About Us",
        id: "aboutUsLabel"
    });
    $.__views.rowContainer.add($.__views.aboutUsLabel);
    $.__views.__alloyId3 = Ti.UI.createView({
        backgroundColor: "#d5d5d5",
        height: "0.5dp",
        width: "100%",
        bottom: "0dp",
        id: "__alloyId3"
    });
    $.__views.aboutus.add($.__views.__alloyId3);
    $.__views.lookupList = Ti.UI.createTableViewRow({
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        height: "40dp",
        id: "lookupList"
    });
    __alloyId0.push($.__views.lookupList);
    $.__views.rowContainer = Ti.UI.createView({
        height: "30dp",
        layout: "horizontal",
        id: "rowContainer"
    });
    $.__views.lookupList.add($.__views.rowContainer);
    $.__views.lookup_icon = Ti.UI.createImageView({
        left: 15,
        height: "25dp",
        width: "25dp",
        image: "images/icons/icon_lookup_128.png",
        id: "lookup_icon"
    });
    $.__views.rowContainer.add($.__views.lookup_icon);
    $.__views.lookupListView = Ti.UI.createView({
        left: 10,
        width: "20dp",
        height: "20dp",
        id: "lookupListView"
    });
    $.__views.rowContainer.add($.__views.lookupListView);
    $.__views.lookUpLabel = Ti.UI.createLabel({
        height: "20dp",
        font: {
            fontSize: "12dp"
        },
        color: "#4d4d4d",
        text: "Lookup",
        id: "lookUpLabel"
    });
    $.__views.rowContainer.add($.__views.lookUpLabel);
    $.__views.__alloyId4 = Ti.UI.createView({
        backgroundColor: "#d5d5d5",
        height: "0.5dp",
        width: "100%",
        bottom: "0dp",
        id: "__alloyId4"
    });
    $.__views.lookupList.add($.__views.__alloyId4);
    $.__views.menuListAdmin = Ti.UI.createTableViewRow({
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        height: "40dp",
        id: "menuListAdmin"
    });
    __alloyId0.push($.__views.menuListAdmin);
    $.__views.rowContainer = Ti.UI.createView({
        height: "30dp",
        layout: "horizontal",
        id: "rowContainer"
    });
    $.__views.menuListAdmin.add($.__views.rowContainer);
    $.__views.list_icon = Ti.UI.createImageView({
        left: 15,
        height: "25dp",
        width: "25dp",
        image: "images/icons/icon_list_128.png",
        id: "list_icon"
    });
    $.__views.rowContainer.add($.__views.list_icon);
    $.__views.menuListAdminView = Ti.UI.createView({
        left: 10,
        width: "20dp",
        height: "20dp",
        id: "menuListAdminView"
    });
    $.__views.rowContainer.add($.__views.menuListAdminView);
    $.__views.menuListAdminLabel = Ti.UI.createLabel({
        height: "20dp",
        font: {
            fontSize: "12dp"
        },
        color: "#4d4d4d",
        text: "Menu List Admin",
        id: "menuListAdminLabel"
    });
    $.__views.rowContainer.add($.__views.menuListAdminLabel);
    $.__views.__alloyId5 = Ti.UI.createView({
        backgroundColor: "#d5d5d5",
        height: "0.5dp",
        width: "100%",
        bottom: "0dp",
        id: "__alloyId5"
    });
    $.__views.menuListAdmin.add($.__views.__alloyId5);
    $.__views.profile = Ti.UI.createTableViewRow({
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        height: "40dp",
        id: "profile"
    });
    __alloyId0.push($.__views.profile);
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
            fontSize: "12dp"
        },
        color: "#4d4d4d",
        text: "Profile",
        id: "profileLabelLabel"
    });
    $.__views.rowContainer.add($.__views.profileLabelLabel);
    $.__views.__alloyId6 = Ti.UI.createView({
        backgroundColor: "#d5d5d5",
        height: "0.5dp",
        width: "100%",
        bottom: "0dp",
        id: "__alloyId6"
    });
    $.__views.profile.add($.__views.__alloyId6);
    $.__views.menuTable = Ti.UI.createTableView({
        separatorStyle: "NONE",
        separatorColor: "transparent",
        backgroundColor: "#ffffff",
        data: __alloyId0,
        id: "menuTable"
    });
    $.__views.menuView.add($.__views.menuTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;