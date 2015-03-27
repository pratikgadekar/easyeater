function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "menu/add";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.addMenu = Ti.UI.createWindow({
        top: 20,
        backgroundColor: "white",
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.UPSIDE_PORTRAIT ],
        navBarHidden: true,
        id: "addMenu"
    });
    $.__views.addMenu && $.addTopLevelView($.__views.addMenu);
    $.__views.topViewBack = Alloy.createController("top_view_back", {
        id: "topViewBack",
        __parentSymbol: $.__views.addMenu
    });
    $.__views.topViewBack.setParent($.__views.addMenu);
    $.__views.__alloyId13 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        top: "50dp",
        id: "__alloyId13"
    });
    $.__views.addMenu.add($.__views.__alloyId13);
    $.__views.cusine_type = Ti.UI.createTextField({
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
        id: "cusine_type",
        hintText: "Select Cusine Type",
        top: "10dp",
        editable: "false"
    });
    $.__views.__alloyId13.add($.__views.cusine_type);
    $.__views.menu_type = Ti.UI.createTextField({
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
        id: "menu_type",
        hintText: "Select Menu Type",
        top: "10dp",
        editable: "false"
    });
    $.__views.__alloyId13.add($.__views.menu_type);
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
        hintText: "Name",
        top: "10dp"
    });
    $.__views.__alloyId13.add($.__views.name);
    $.__views.price = Ti.UI.createTextField({
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
        id: "price",
        hintText: "Price",
        top: "10dp"
    });
    $.__views.__alloyId13.add($.__views.price);
    $.__views.discription = Ti.UI.createTextField({
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
        id: "discription",
        hintText: "Discription",
        top: "10dp"
    });
    $.__views.__alloyId13.add($.__views.discription);
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
    $.__views.__alloyId13.add($.__views.Add);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.addMenu.left = Ti.Platform.displayCaps.platformWidth;
    $.topViewBack.addView.visible = false;
    $.topViewBack.menuImgView.addEventListener("click", function() {
        $.addMenu.close(slide_it_right);
    });
    $.topViewBack.headerLabel.text = "Add Menu";
    var menu_type_opt = [ "Veg", "Non Veg" ];
    var dialog = Ti.UI.createOptionDialog();
    var option_index;
    var lookupObjectId;
    $.menu_type.addEventListener("click", function() {
        option_index = "type";
        dialog.title = "Select Type";
        dialog.options = menu_type_opt;
        dialog.show();
    });
    $.cusine_type.addEventListener("click", function() {
        option_index = "cusine";
        dialog.title = "Select Cusine Type";
        dialog.options = lookupnames;
        dialog.show();
    });
    dialog.addEventListener("click", function(evt) {
        "type" == option_index && ($.menu_type.value = menu_type_opt[evt.index]);
        if ("cusine" == option_index) {
            $.cusine_type.value = lookupnames[evt.index];
            lookupObjectId = lookupids[evt.index];
        }
    });
    var lookupids = [];
    var lookupnames = [];
    var Lookup = Parse.Object.extend("Lookup");
    var query = new Parse.Query(Lookup);
    query.equalTo("type", "1");
    query.find({
        success: function(lookups) {
            lookups && _.each(lookups, function(_l) {
                lookupids.push(_l.id);
                lookupnames.push(_l.get("name"));
            });
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
    $.Add.addEventListener("click", function() {
        if ("" == $.cusine_type.value || "" == $.menu_type.value || "" == $.name.value || "" == $.price.value || "" == $.discription.value) alert("All fields are mendetory"); else {
            var menutype;
            "Veg" == $.menu_type.value ? menutype = "1" : "Non Veg" == $.menu_type.value && (menutype = "2");
            Ti.API.info($.name.value);
            Ti.API.info($.price.value);
            Ti.API.info(lookupObjectId);
            Ti.API.info($.discription.value);
            Ti.API.info(menutype);
            Parse.Cloud.run("menuSave", {
                name: $.name.value,
                price: $.price.value,
                cusine_type_id: lookupObjectId,
                discription: $.discription.value,
                menu_type: menutype
            }, {
                success: function() {
                    alert("Menu added successfully");
                    $.addMenu.close();
                },
                error: function(error) {
                    alert(error);
                }
            });
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;