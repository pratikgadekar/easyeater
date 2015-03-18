function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "menu/menu_admin_list";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.menuAdminList = Ti.UI.createView({
        id: "menuAdminList",
        backgroundColor: "gray"
    });
    $.__views.menuAdminList && $.addTopLevelView($.__views.menuAdminList);
    $.__views.topView = Alloy.createController("top_view", {
        id: "topView",
        __parentSymbol: $.__views.menuAdminList
    });
    $.__views.topView.setParent($.__views.menuAdminList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;