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
    var __alloyId0 = [];
    $.__views.menuList = Ti.UI.createTableViewRow({
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        height: "50dp",
        id: "menuList"
    });
    __alloyId0.push($.__views.menuList);
    $.__views.rowContainer = Ti.UI.createView({
        height: "30dp",
        layout: "horizontal",
        id: "rowContainer"
    });
    $.__views.menuList.add($.__views.rowContainer);
    $.__views.menuListView = Ti.UI.createView({
        left: 5,
        top: 7,
        width: "20dp",
        height: "20dp",
        id: "menuListView"
    });
    $.__views.rowContainer.add($.__views.menuListView);
    $.__views.menuLabel = Ti.UI.createLabel({
        top: 7,
        left: 10,
        height: "20dp",
        font: {
            fontSize: "14sp"
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
        height: "50dp",
        id: "feedbackList"
    });
    __alloyId0.push($.__views.feedbackList);
    $.__views.rowContainer = Ti.UI.createView({
        height: "30dp",
        layout: "horizontal",
        id: "rowContainer"
    });
    $.__views.feedbackList.add($.__views.rowContainer);
    $.__views.feedbackListView = Ti.UI.createView({
        left: 5,
        top: 7,
        width: "20dp",
        height: "20dp",
        id: "feedbackListView"
    });
    $.__views.rowContainer.add($.__views.feedbackListView);
    $.__views.feedbackLabel = Ti.UI.createLabel({
        top: 7,
        left: 10,
        height: "20dp",
        font: {
            fontSize: "14sp"
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
        height: "50dp",
        id: "aboutus"
    });
    __alloyId0.push($.__views.aboutus);
    $.__views.rowContainer = Ti.UI.createView({
        height: "30dp",
        layout: "horizontal",
        id: "rowContainer"
    });
    $.__views.aboutus.add($.__views.rowContainer);
    $.__views.aboutusView = Ti.UI.createView({
        left: 5,
        top: 7,
        width: "20dp",
        height: "20dp",
        id: "aboutusView"
    });
    $.__views.rowContainer.add($.__views.aboutusView);
    $.__views.aboutUsLabel = Ti.UI.createLabel({
        top: 7,
        left: 10,
        height: "20dp",
        font: {
            fontSize: "14sp"
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
        height: "50dp",
        id: "lookupList"
    });
    __alloyId0.push($.__views.lookupList);
    $.__views.rowContainer = Ti.UI.createView({
        height: "30dp",
        layout: "horizontal",
        id: "rowContainer"
    });
    $.__views.lookupList.add($.__views.rowContainer);
    $.__views.lookupListView = Ti.UI.createView({
        left: 5,
        top: 7,
        width: "20dp",
        height: "20dp",
        id: "lookupListView"
    });
    $.__views.rowContainer.add($.__views.lookupListView);
    $.__views.lookUpLabel = Ti.UI.createLabel({
        top: 7,
        left: 10,
        height: "20dp",
        font: {
            fontSize: "14sp"
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
        height: "50dp",
        id: "menuListAdmin"
    });
    __alloyId0.push($.__views.menuListAdmin);
    $.__views.rowContainer = Ti.UI.createView({
        height: "30dp",
        layout: "horizontal",
        id: "rowContainer"
    });
    $.__views.menuListAdmin.add($.__views.rowContainer);
    $.__views.menuListAdminView = Ti.UI.createView({
        left: 5,
        top: 7,
        width: "20dp",
        height: "20dp",
        id: "menuListAdminView"
    });
    $.__views.rowContainer.add($.__views.menuListAdminView);
    $.__views.menuListAdminLabel = Ti.UI.createLabel({
        top: 7,
        left: 10,
        height: "20dp",
        font: {
            fontSize: "14sp"
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
        height: "50dp",
        id: "profile"
    });
    __alloyId0.push($.__views.profile);
    $.__views.rowContainer = Ti.UI.createView({
        height: "30dp",
        layout: "horizontal",
        id: "rowContainer"
    });
    $.__views.profile.add($.__views.rowContainer);
    $.__views.profileView = Ti.UI.createView({
        left: 5,
        top: 7,
        width: "20dp",
        height: "20dp",
        id: "profileView"
    });
    $.__views.rowContainer.add($.__views.profileView);
    $.__views.profileLabelLabel = Ti.UI.createLabel({
        top: 7,
        left: 10,
        height: "20dp",
        font: {
            fontSize: "14sp"
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