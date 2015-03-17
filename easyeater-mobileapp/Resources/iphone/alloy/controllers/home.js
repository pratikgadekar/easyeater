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
    this.__controllerPath = "home";
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
    $.__views.home = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "home"
    });
    $.__views.home && $.addTopLevelView($.__views.home);
    $.__views.drawermenu = Alloy.createWidget("com.alcoapps.drawermenu", "widget", {
        id: "drawermenu",
        __parentSymbol: $.__views.home
    });
    $.__views.drawermenu.setParent($.__views.home);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.home;
    var main = Ti.UI.createView({
        backgroundColor: "#fff"
    });
    Alloy.CFG.drawermenu = $.drawermenu;
    Alloy.CFG.main = main;
    var menu = Alloy.createController("menu").getView();
    $.drawermenu.init({
        menuview: menu,
        mainview: main,
        duration: 200,
        parent: $.home
    });
    $.home.addEventListener("open", function() {
        var actionBarHelper = require("com.alcoapps.actionbarhelper")($.home);
        actionBarHelper.setIcon("/drawericonw@2x.png");
        actionBarHelper.setTitle("ActionBar with DrawerMenu");
        actionBarHelper.setUpAction(function() {
            $.drawermenu.showhidemenu();
        });
        actionBarHelper.displayHomeAsUp(false);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;