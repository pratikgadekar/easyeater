function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "chk";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.chk = Ti.UI.createWindow({
        title: "Nav Window",
        backgroundColor: "#f00",
        width: "100%",
        height: "100%",
        id: "chk"
    });
    $.__views.chk && $.addTopLevelView($.__views.chk);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var closeBtn = Titanium.UI.createButton({
        title: "Close"
    });
    $.chk.leftNavButton = closeBtn;
    closeBtn.addEventListener("click", function() {
        $.chk.close();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;