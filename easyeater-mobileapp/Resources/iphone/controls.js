var Alloy = require("alloy");

exports.getMenuView = function() {
    return Alloy.createController("menuview");
};

exports.getMenuList = function() {
    return Alloy.createController("menu/list");
};

exports.getFeedbackList = function() {
    return Alloy.createController("feedback/list");
};

exports.getAboutUs = function() {
    return Alloy.createController("aboutus");
};

exports.getProfile = function() {
    return Alloy.createController("profile");
};

exports.getBlankView = function() {
    return Alloy.createController("blank");
};