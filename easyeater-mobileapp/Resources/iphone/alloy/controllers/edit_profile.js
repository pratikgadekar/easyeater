function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "edit_profile";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.editProfile = Ti.UI.createWindow({
        top: 20,
        backgroundColor: "#ffffff",
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.UPSIDE_PORTRAIT ],
        navBarHidden: true,
        id: "editProfile"
    });
    $.__views.editProfile && $.addTopLevelView($.__views.editProfile);
    $.__views.topViewBack = Alloy.createController("top_view_back", {
        id: "topViewBack",
        __parentSymbol: $.__views.editProfile
    });
    $.__views.topViewBack.setParent($.__views.editProfile);
    $.__views.__alloyId0 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        top: "50dp",
        id: "__alloyId0"
    });
    $.__views.editProfile.add($.__views.__alloyId0);
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
        hintText: "User name",
        top: "10dp"
    });
    $.__views.__alloyId0.add($.__views.userName);
    $.__views.email = Ti.UI.createTextField({
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
        id: "email",
        hintText: "Email Id",
        top: "10dp"
    });
    $.__views.__alloyId0.add($.__views.email);
    $.__views.firstName = Ti.UI.createTextField({
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
        id: "firstName",
        hintText: "First Name",
        top: "10dp"
    });
    $.__views.__alloyId0.add($.__views.firstName);
    $.__views.lastName = Ti.UI.createTextField({
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
        id: "lastName",
        hintText: "Last Name",
        top: "10dp"
    });
    $.__views.__alloyId0.add($.__views.lastName);
    $.__views.update = Ti.UI.createButton({
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
        title: "Update",
        id: "update",
        top: "10dp"
    });
    $.__views.__alloyId0.add($.__views.update);
    $.__views.resetPassword = Ti.UI.createLabel({
        color: "#f69a55",
        font: {
            fontSize: "12dp"
        },
        id: "resetPassword",
        text: "Reset Password",
        right: "10%",
        top: "10dp"
    });
    $.__views.__alloyId0.add($.__views.resetPassword);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.editProfile.left = Ti.Platform.displayCaps.platformWidth;
    $.topViewBack.headerLabel.text = "Edit Profile";
    $.topViewBack.addView.visible = false;
    $.topViewBack.menuImgView.addEventListener("click", function() {
        $.editProfile.close(slide_it_right);
    });
    if (Parse.User.current()) {
        $.userName.value = Parse.User.current().attributes.username;
        $.email.value = Parse.User.current().attributes.email;
        $.firstName.value = Parse.User.current().attributes.firstName;
        $.lastName.value = Parse.User.current().attributes.lastName;
    }
    $.update.addEventListener("click", function() {
        if ("" == $.userName.value || "" == $.email.value || "" == $.firstName.value || "" == $.lastName.value) alert("All fields are mendetory"); else {
            var currentUser = Parse.User.current();
            currentUser.set("username", $.userName.value);
            currentUser.set("email", $.email.value);
            currentUser.set("firstName", $.firstName.value);
            currentUser.set("lastName", $.lastName.value);
            currentUser.save(null, {
                success: function() {
                    alert("Profile updated succesfully");
                },
                error: function(userAgain, error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        }
    });
    $.resetPassword.addEventListener("click", function() {
        Parse.User.requestPasswordReset(Parse.User.current().attributes.email, {
            success: function() {
                alert("Password reset link send to your email.");
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;