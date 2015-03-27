function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.alcoapps.drawermenu/" + s : s.substring(0, index) + "/com.alcoapps.drawermenu/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isApi: true,
    priority: 1000.0003,
    key: "TableViewRow",
    style: {
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
    }
}, {
    isApi: true,
    priority: 1000.0004,
    key: "TextField",
    style: {
        borderColor: "#4d4d4d",
        width: "80%",
        height: "30dp",
        borderWidth: "0.5dp",
        borderRadius: "3",
        font: {
            fontSize: "12dp"
        },
        color: "#4d4d4d",
        paddingLeft: "10dp"
    }
}, {
    isApi: true,
    priority: 1000.0005,
    key: "Button",
    style: {
        backgroundColor: "#ffffff",
        height: "30dp",
        width: "80%",
        color: "#f69a55",
        borderRadius: "5",
        borderColor: "#f69a55",
        borderWidth: "0.5dp",
        font: {
            fontSize: "12dp"
        }
    }
}, {
    isApi: true,
    priority: 1101.0001,
    key: "Window",
    style: {
        top: 20,
        backgroundColor: "white",
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.UPSIDE_PORTRAIT ],
        navBarHidden: true
    }
}, {
    isId: true,
    priority: 100000.0002,
    key: "menuview",
    style: {
        backgroundColor: "#cacaca",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL
    }
}, {
    isId: true,
    priority: 100000.0003,
    key: "mainview",
    style: {
        backgroundColor: "red",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL
    }
}, {
    isId: true,
    priority: 100000.0004,
    key: "mainviewheader",
    style: {
        top: "0",
        height: "50dp",
        width: Ti.UI.FILL,
        backgroundColor: "#cacaca"
    }
}, {
    isId: true,
    priority: 100000.0005,
    key: "menubutton",
    style: {
        left: "0",
        borderWidth: 1,
        borderColor: "#000",
        width: "40dp",
        height: "40dp",
        visible: true
    }
} ];