function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "feedback/feedback_admin_list";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.feedbackAdminList = Ti.UI.createWindow({
        top: 20,
        backgroundColor: "#ffffff",
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.UPSIDE_PORTRAIT ],
        navBarHidden: true,
        id: "feedbackAdminList"
    });
    $.__views.feedbackAdminList && $.addTopLevelView($.__views.feedbackAdminList);
    $.__views.topViewBack = Alloy.createController("top_view_back", {
        id: "topViewBack",
        __parentSymbol: $.__views.feedbackAdminList
    });
    $.__views.topViewBack.setParent($.__views.feedbackAdminList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.feedbackAdminList.left = Ti.Platform.displayCaps.platformWidth;
    $.topViewBack.headerLabel.text = "Feedback";
    $.topViewBack.addView.visible = false;
    $.topViewBack.menuImgView.addEventListener("click", function() {
        $.feedbackAdminList.close(slide_it_right);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;