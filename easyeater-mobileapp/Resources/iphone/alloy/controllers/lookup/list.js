function Controller() {
    function lookupListData() {
        var Lookup = Parse.Object.extend("Lookup");
        var query = new Parse.Query(Lookup);
        query.find({
            success: function(lookups) {
                Ti.API.info(JSON.stringify(lookups));
                if (lookups) {
                    var _data = [];
                    _.each(lookups, function(_l) {
                        Ti.API.info("Lookups " + JSON.stringify(_l));
                        var _lookup = _l.toJSON();
                        _data.push({
                            name: {
                                text: _lookup.name
                            },
                            tick: {
                                visible: false
                            },
                            properties: {
                                itemId: _l.id,
                                selectedBackgroundColor: "transparent",
                                selectedColor: "transparent",
                                title: _lookup.name
                            }
                        });
                    });
                    var section = Ti.UI.createListSection({
                        items: _data,
                        font: {
                            fontFamily: "Helvetica Neue",
                            fontSize: "16dp",
                            fontWeight: "normal"
                        },
                        color: "#595959"
                    });
                    $.lookupNameList.sections = [ section ];
                }
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "lookup/list";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.lookupList = Ti.UI.createWindow({
        top: 20,
        backgroundColor: "#ffffff",
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.UPSIDE_PORTRAIT ],
        navBarHidden: true,
        id: "lookupList"
    });
    $.__views.lookupList && $.addTopLevelView($.__views.lookupList);
    $.__views.topViewBack = Alloy.createController("top_view_back", {
        id: "topViewBack",
        __parentSymbol: $.__views.lookupList
    });
    $.__views.topViewBack.setParent($.__views.lookupList);
    var __alloyId7 = {};
    var __alloyId10 = [];
    var __alloyId11 = {
        type: "Ti.UI.Label",
        bindId: "name",
        properties: {
            font: {
                fontSize: "14sp"
            },
            color: "#4d4d4d",
            left: "20dp",
            bindId: "name"
        }
    };
    __alloyId10.push(__alloyId11);
    var __alloyId12 = {
        type: "Ti.UI.ImageView",
        properties: {
            image: "images/icons/icon_side_arrow.png",
            right: "5dp,",
            height: "20dp",
            width: "20dp"
        }
    };
    __alloyId10.push(__alloyId12);
    var __alloyId9 = {
        properties: {
            name: "template",
            top: "0dp",
            backgroundColor: "transparent",
            selectionStyle: Titanium.UI.iPhone.ListViewCellSelectionStyle.NONE
        },
        childTemplates: __alloyId10
    };
    __alloyId7["template"] = __alloyId9;
    $.__views.lookupNameList = Ti.UI.createListView({
        templates: __alloyId7,
        id: "lookupNameList",
        defaultItemTemplate: "template",
        top: "55dp",
        backgroundColor: "transparent",
        right: "10dp"
    });
    $.__views.lookupList.add($.__views.lookupNameList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.lookupList.left = Ti.Platform.displayCaps.platformWidth;
    $.topViewBack.headerLabel.text = "Lookup";
    $.topViewBack.menuImgView.addEventListener("click", function() {
        $.lookupList.close(slide_it_right);
    });
    $.topViewBack.addView.addEventListener("click", function() {
        Alloy.createController("lookup/add").getView().open(slide_it_left);
    });
    lookupListData();
    $.lookupNameList.addEventListener("itemclick", function(e) {
        Ti.API.info(e.itemId);
        var Lookup = Parse.Object.extend("Lookup");
        var query = new Parse.Query(Lookup);
        query.equalTo("objectId", e.itemId);
        query.first({
            success: function(object) {
                Ti.API.info("object" + JSON.stringify(object));
                var data = {
                    page: "edit",
                    lookupObject: object
                };
                Alloy.createController("lookup/add", data).getView().open(slide_it_left);
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    });
    var addLookup = function() {
        $.lookupNameList.removeAllChildren();
        lookupListData();
    };
    Ti.App.addEventListener("addLookup", addLookup);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;