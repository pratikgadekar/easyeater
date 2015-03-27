function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "lookup/add";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.addLookup = Ti.UI.createWindow({
        top: 20,
        backgroundColor: "white",
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.UPSIDE_PORTRAIT ],
        navBarHidden: true,
        id: "addLookup"
    });
    $.__views.addLookup && $.addTopLevelView($.__views.addLookup);
    $.__views.topViewBack = Alloy.createController("top_view_back", {
        id: "topViewBack",
        __parentSymbol: $.__views.addLookup
    });
    $.__views.topViewBack.setParent($.__views.addLookup);
    $.__views.__alloyId6 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        top: "50dp",
        id: "__alloyId6"
    });
    $.__views.addLookup.add($.__views.__alloyId6);
    $.__views.name = Ti.UI.createTextField({
        borderColor: "#4d4d4d",
        width: "80%",
        height: "30dp",
        borderWidth: "0.5dp",
        borderRadius: "3",
        font: {
            fontSize: "12dp"
        },
        color: "#4d4d4d",
        paddingLeft: "10dp",
        id: "name",
        hintText: "Lookup Name",
        top: "10dp"
    });
    $.__views.__alloyId6.add($.__views.name);
    $.__views.type = Ti.UI.createTextField({
        borderColor: "#4d4d4d",
        width: "80%",
        height: "30dp",
        borderWidth: "0.5dp",
        borderRadius: "3",
        font: {
            fontSize: "12dp"
        },
        color: "#4d4d4d",
        paddingLeft: "10dp",
        id: "type",
        hintText: "Look Up type e.g. 0 or 1",
        top: "10dp"
    });
    $.__views.__alloyId6.add($.__views.type);
    $.__views.Add = Ti.UI.createButton({
        backgroundColor: "#f69a55",
        height: "30dp",
        width: "80%",
        color: "#ffffff",
        borderRadius: "5",
        borderColor: "#f69a55",
        borderWidth: "0.5dp",
        font: {
            fontSize: "12dp"
        },
        title: "Add",
        id: "Add",
        top: "10dp"
    });
    $.__views.__alloyId6.add($.__views.Add);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.addLookup.left = Ti.Platform.displayCaps.platformWidth;
    $.topViewBack.addView.visible = false;
    $.topViewBack.menuImgView.addEventListener("click", function() {
        $.addLookup.close(slide_it_right);
    });
    if ("edit" == args.page) {
        $.topViewBack.headerLabel.text = "Edit Lookup";
        $.Add.title = "Update";
        $.name.value = args.lookupObject.get("name");
        $.type.value = args.lookupObject.get("type");
    } else $.topViewBack.headerLabel.text = "Add Lookup";
    $.Add.addEventListener("click", function() {
        "" == $.name.value || "" == $.type.value ? alert("All fields are mendetory") : "edit" == args.page ? Parse.Cloud.run("lookupSave", {
            id: args.lookupObject.id,
            name: $.name.value,
            type: $.type.value
        }, {
            success: function() {
                alert("Look up updated successfully");
                $.addLookup.close();
                Ti.App.fireEvent("addLookup", {
                    message: "Property added successfully"
                });
            },
            error: function() {}
        }) : Parse.Cloud.run("lookupSave", {
            name: $.name.value,
            type: $.type.value
        }, {
            success: function() {
                alert("Look up added successfully");
                $.addLookup.close();
                Ti.App.fireEvent("addLookup", {
                    message: "Property added successfully"
                });
            },
            error: function() {}
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;