function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "lookup/list";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.lookupList = Ti.UI.createView({
        id: "lookupList",
        backgroundColor: "#ffffff"
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
    $.topView.headerLabel.text = "Lookup";
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;