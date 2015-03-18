function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "menu/list";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.menuList = Ti.UI.createView({
        id: "menuList",
        backgroundColor: "yellow"
    });
    $.__views.menuList && $.addTopLevelView($.__views.menuList);
    $.__views.topView = Alloy.createController("top_view", {
        id: "topView",
        __parentSymbol: $.__views.menuList
    });
    $.__views.topView.setParent($.__views.menuList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;