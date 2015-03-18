function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "feedback/feedback";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.feedback = Ti.UI.createView({
        id: "feedback",
        backgroundColor: "red"
    });
    $.__views.feedback && $.addTopLevelView($.__views.feedback);
    $.__views.top_view = Alloy.createController("top_view", {
        id: "top_view",
        __parentSymbol: $.__views.feedback
    });
    $.__views.top_view.setParent($.__views.feedback);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;