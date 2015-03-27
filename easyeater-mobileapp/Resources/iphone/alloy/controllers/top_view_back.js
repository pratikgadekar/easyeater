function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "top_view_back";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
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
        image: "images/icons/icon_back_button.png",
        height: "20dp",
        width: "20dp",
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
    $.__views.addView = Ti.UI.createView({
        height: "50dp",
        width: "40dp",
        right: "0dp",
        id: "addView"
    });
    $.__views.topView.add($.__views.addView);
    $.__views.addImage = Ti.UI.createImageView({
        image: "images/icons/icon_add.png",
        height: "25dp",
        width: "25dp",
        id: "addImage"
    });
    $.__views.addView.add($.__views.addImage);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.menuImgView.addEventListener("click", function() {});
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;