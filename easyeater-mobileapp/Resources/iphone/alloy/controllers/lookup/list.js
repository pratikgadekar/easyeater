function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "lookup/list";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.lookupList = Ti.UI.createView({
        id: "lookupList",
        backgroundColor: "orange"
    });
    $.__views.lookupList && $.addTopLevelView($.__views.lookupList);
    $.__views.topView = Alloy.createController("top_view", {
        id: "topView",
        __parentSymbol: $.__views.lookupList
    });
    $.__views.topView.setParent($.__views.lookupList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;