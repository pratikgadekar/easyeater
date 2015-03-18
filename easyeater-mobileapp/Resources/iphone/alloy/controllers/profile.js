function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "profile";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.profile = Ti.UI.createView({
        id: "profile",
        backgroundColor: "cyan"
    });
    $.__views.profile && $.addTopLevelView($.__views.profile);
    $.__views.topView = Alloy.createController("top_view", {
        id: "topView",
        __parentSymbol: $.__views.profile
    });
    $.__views.topView.setParent($.__views.profile);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;