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
    this.__controllerPath = "top_view";
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
    $.__views.topView = Ti.UI.createView({
        backgroundColor: "#f7f7f7",
        height: "50dp",
        top: "0dp",
        id: "topView"
    });
    $.__views.topView && $.addTopLevelView($.__views.topView);
    $.__views.menuImgView = Ti.UI.createView({
        height: "50dp",
        width: "50dp",
        left: "0dp",
        id: "menuImgView"
    });
    $.__views.topView.add($.__views.menuImgView);
    $.__views.menuListImg = Ti.UI.createImageView({
        image: "images/icons/icon_menu.png",
        height: "30dp",
        width: "30dp",
        id: "menuListImg"
    });
    $.__views.menuImgView.add($.__views.menuListImg);
    $.__views.headerLabel = Ti.UI.createLabel({
        height: "20dp",
        font: {
            fontSize: "14dp"
        },
        color: "#4d4d4d",
        id: "headerLabel"
    });
    $.__views.topView.add($.__views.headerLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.menuImgView.addEventListener("click", function() {
        Ti.App.fireEvent("menuButtonClick");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;