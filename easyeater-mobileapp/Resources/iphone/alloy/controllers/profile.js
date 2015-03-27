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
        backgroundColor: "#ffffff"
    });
    $.__views.profile && $.addTopLevelView($.__views.profile);
    $.__views.topView = Alloy.createController("top_view", {
        id: "topView",
        __parentSymbol: $.__views.profile
    });
    $.__views.topView.setParent($.__views.profile);
    $.__views.loginView = Ti.UI.createView({
        top: "70dp",
        height: Ti.UI.SIZE,
        id: "loginView",
        layout: "vertical"
    });
    $.__views.profile.add($.__views.loginView);
    $.__views.userName = Ti.UI.createTextField({
        borderColor: "#4d4d4d",
        width: "80%",
        height: "30dp",
        borderWidth: "0.5dp",
        borderRadius: "3",
        font: {
            fontSize: "12dp"
        },
        color: "#4d4d4d",
        paddingLeft: "10dp",
        id: "userName",
        hintText: "User name"
    });
    $.__views.loginView.add($.__views.userName);
    $.__views.password = Ti.UI.createTextField({
        borderColor: "#4d4d4d",
        width: "80%",
        height: "30dp",
        borderWidth: "0.5dp",
        borderRadius: "3",
        font: {
            fontSize: "12dp"
        },
        color: "#4d4d4d",
        paddingLeft: "10dp",
        id: "password",
        passwordMask: "true",
        hintText: "Passowrd",
        top: "10dp"
    });
    $.__views.loginView.add($.__views.password);
    $.__views.signIn = Ti.UI.createButton({
        backgroundColor: "#f69a55",
        height: "30dp",
        width: "80%",
        color: "#ffffff",
        borderRadius: "5",
        borderColor: "#f69a55",
        borderWidth: "0.5dp",
        font: {
            fontSize: "12dp"
        },
        title: "Sign In",
        id: "signIn",
        top: "10dp"
    });
    $.__views.loginView.add($.__views.signIn);
    $.__views.UserDetails = Ti.UI.createView({
        id: "UserDetails",
        layout: "vertical",
        top: "70dp"
    });
    $.__views.profile.add($.__views.UserDetails);
    $.__views.editProfile = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        height: "30dp",
        width: "80%",
        color: "#f69a55",
        borderRadius: "5",
        borderColor: "#f69a55",
        borderWidth: "0.5dp",
        font: {
            fontSize: "12dp"
        },
        title: "Edit Profile",
        id: "editProfile",
        top: "10dp"
    });
    $.__views.UserDetails.add($.__views.editProfile);
    $.__views.lookup = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        height: "30dp",
        width: "80%",
        color: "#f69a55",
        borderRadius: "5",
        borderColor: "#f69a55",
        borderWidth: "0.5dp",
        font: {
            fontSize: "12dp"
        },
        title: "Lookup",
        id: "lookup",
        top: "10dp"
    });
    $.__views.UserDetails.add($.__views.lookup);
    $.__views.menu = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        height: "30dp",
        width: "80%",
        color: "#f69a55",
        borderRadius: "5",
        borderColor: "#f69a55",
        borderWidth: "0.5dp",
        font: {
            fontSize: "12dp"
        },
        title: "Menu",
        id: "menu",
        top: "10dp"
    });
    $.__views.UserDetails.add($.__views.menu);
    $.__views.feedback = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        height: "30dp",
        width: "80%",
        color: "#f69a55",
        borderRadius: "5",
        borderColor: "#f69a55",
        borderWidth: "0.5dp",
        font: {
            fontSize: "12dp"
        },
        title: "Feedback",
        id: "feedback",
        top: "10dp"
    });
    $.__views.UserDetails.add($.__views.feedback);
    $.__views.logOut = Ti.UI.createButton({
        backgroundColor: "#ffffff",
        height: "30dp",
        width: "80%",
        color: "#f69a55",
        borderRadius: "5",
        borderColor: "#f69a55",
        borderWidth: "0.5dp",
        font: {
            fontSize: "12dp"
        },
        title: "Log Out",
        id: "logOut",
        top: "10dp"
    });
    $.__views.UserDetails.add($.__views.logOut);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.topView.headerLabel.text = "Profile";
    if (Parse.User.current()) {
        $.loginView.visible = false;
        $.loginView.height = "0dp";
    } else {
        $.UserDetails.visible = false;
        $.UserDetails.height = "0dp";
    }
    $.signIn.addEventListener("click", function() {
        "" == $.userName.value || "" == $.password.value ? alert("Invalid user name or password") : Parse.User.logIn($.userName.value.toLowerCase(), $.password.value, {
            success: function(user) {
                Ti.API.info("sucess" + JSON.stringify(user));
                $.loginView.visible = false;
                $.loginView.height = "0dp";
                $.UserDetails.visible = true;
                $.UserDetails.height = Ti.UI.SIZE;
                Ti.App.fireEvent("login");
                Ti.App.fireEvent("loginlogoutsucess", {
                    value: "login"
                });
            },
            error: function(user, error) {
                Ti.API.info("error" + JSON.stringify(error));
                alert("Invalid user name or password");
            }
        });
    });
    $.logOut.addEventListener("click", function() {
        Parse.User.logOut();
        $.UserDetails.visible = false;
        $.UserDetails.height = "0dp";
        $.loginView.visible = true;
        $.loginView.height = Ti.UI.SIZE;
        Ti.App.fireEvent("loginlogoutsucess", {
            value: "logout"
        });
    });
    $.editProfile.addEventListener("click", function() {
        Alloy.createController("edit_profile").getView().open(slide_it_left);
    });
    $.lookup.addEventListener("click", function() {
        Alloy.createController("lookup/list").getView().open(slide_it_left);
    });
    $.menu.addEventListener("click", function() {
        Alloy.createController("menu/menu_admin_list").getView().open(slide_it_left);
    });
    $.feedback.addEventListener("click", function() {
        Alloy.createController("feedback/feedback_admin_list").getView().open(slide_it_left);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;