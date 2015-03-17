function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __alloyId0 = [];
    $.__views.win2 = Ti.UI.createWindow({
        id: "win2",
        title: "Tab 2"
    });
    $.__views.label2 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#999",
        text: "I am Window 2",
        id: "label2"
    });
    $.__views.win2.add($.__views.label2);
    $.__views.tab2 = Ti.UI.createTab({
        window: $.__views.win2,
        id: "tab2",
        title: "Tab 2",
        icon: "KS_nav_views.png"
    });
    __alloyId0.push($.__views.tab2);
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId0,
        backgroundColor: "white",
        tabHeight: "0dp",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.label2.addEventListener("click", function() {
        Titanium.UI.createWindow({
            title: "Nav Window",
            backgroundColor: "#f00",
            width: "100%",
            height: "100%"
        });
        $.tab2.open(Alloy.createController("chk").getView());
    });
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;