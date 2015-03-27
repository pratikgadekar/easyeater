var args = arguments[0] || {};

$.addMenu.left = Ti.Platform.displayCaps.platformWidth;

$.topViewBack.addView.visible = false;

$.topViewBack.menuImgView.addEventListener('click', function(e) {
	$.addMenu.close(slide_it_right);

});

$.topViewBack.headerLabel.text = "Add Menu";

var menu_type_opt = ['Veg', 'Non Veg'];

var dialog = Ti.UI.createOptionDialog();

var option_index;

var lookupObjectId;

$.menu_type.addEventListener('click', function(e) {
	//alert("abc");
	option_index = "type";
	dialog.title = 'Select Type';
	dialog.options = menu_type_opt;
	dialog.show();
});

$.cusine_type.addEventListener('click', function(e) {
	//alert("abc");
	option_index = "cusine";
	dialog.title = 'Select Cusine Type';
	dialog.options = lookupnames;
	dialog.show();
});

dialog.addEventListener('click', function(evt) {
	// alert('You picked ' + menu_type_opt[evt.index]);
	if (option_index == "type") {
		$.menu_type.value = menu_type_opt[evt.index];
	}
	if (option_index == "cusine") {
		$.cusine_type.value = lookupnames[evt.index];
		lookupObjectId = lookupids[evt.index];
	}

});

var lookupids = [];
var lookupnames = [];

var Lookup = Parse.Object.extend("Lookup");
var query = new Parse.Query(Lookup);
query.equalTo("type", "1");
query.find({
	success : function(lookups) {

		// Do something with the returned Parse.Object values

		if (lookups) {

			_.each(lookups, function(_l) {
				//Ti.API.info("lookups id " + _l.id);
				lookupids.push(_l.id);
				lookupnames.push(_l.get("name"));
				//Ti.API.info("lookups name " + _l.get("name"));
			});
		}

	},
	error : function(error) {
		alert("Error: " + error.code + " " + error.message);
	}
});

$.Add.addEventListener('click', function(e) {
	if ($.cusine_type.value == '' || $.menu_type.value == '' || $.name.value == '' || $.price.value == '' || $.discription.value == '') {
		alert("All fields are mendetory");
	} else {
		// /alert(lookupObjectId);
		var menutype;

		if ($.menu_type.value == "Veg") {
			menutype = "1";
		} else if ($.menu_type.value == "Non Veg") {
			menutype = "2";
		}

		Ti.API.info($.name.value);
		Ti.API.info($.price.value);
		Ti.API.info(lookupObjectId);
		Ti.API.info($.discription.value);
		Ti.API.info(menutype);

		Parse.Cloud.run('menuSave', {
			"name" : $.name.value,
			"price" : $.price.value,
			"cusine_type_id" : lookupObjectId,
			"discription" : $.discription.value,
			"menu_type" : menutype
		}, {
			success : function(result) {
				// result is 'Hello world!'

				alert("Menu added successfully");
				$.addMenu.close();
				// Ti.App.fireEvent('addLookup', {
				// message : "Property added successfully"
				// });
			},
			error : function(error) {
				alert(error);
			}
		});

	}

});
