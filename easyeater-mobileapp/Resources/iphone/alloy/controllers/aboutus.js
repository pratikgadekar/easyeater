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
    this.__controllerPath = "aboutus";
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
    $.__views.aboutus = Ti.UI.createView({
        id: "aboutus",
        backgroundColor: "#ffffff"
    });
    $.__views.aboutus && $.addTopLevelView($.__views.aboutus);
    $.__views.topView = Alloy.createController("top_view", {
        id: "topView",
        __parentSymbol: $.__views.aboutus
    });
    $.__views.topView.setParent($.__views.aboutus);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.topView.headerLabel.text = "About Us";
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;