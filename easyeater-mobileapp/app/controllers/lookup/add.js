var args = arguments[0] || {};

$.addLookup.left = Ti.Platform.displayCaps.platformWidth;

$.topViewBack.addView.visible = false;

$.topViewBack.menuImgView.addEventListener('click', function(e) {
	$.addLookup.close(slide_it_right);

});

if (args.page == "edit") {
	$.topViewBack.headerLabel.text = "Edit Lookup";
	$.Add.title = "Update";
	//Ti.API.info("object 1" + JSON.stringify(args.lookupObject.id));
	$.name.value = args.lookupObject.get("name");
	$.type.value = args.lookupObject.get("type");

} else {
	$.topViewBack.headerLabel.text = "Add Lookup";
}

$.Add.addEventListener('click', function(e) {
	if ($.name.value == '' || $.type.value == '') {
		alert("All fields are mendetory");
	} else {
		if (args.page == "edit") {
			Parse.Cloud.run('lookupSave', {
				"id" : args.lookupObject.id,
				"name" : $.name.value,
				"type" : $.type.value
			}, {
				success : function(result) {
					// result is 'Hello world!'
					alert("Look up updated successfully");
					$.addLookup.close();
					Ti.App.fireEvent('addLookup', {
						message : "Property added successfully"
					});
				},
				error : function(error) {
				}
			});
		} else {

			Parse.Cloud.run('lookupSave', {
				"name" : $.name.value,
				"type" : $.type.value
			}, {
				success : function(result) {
					// result is 'Hello world!'
					
					alert("Look up added successfully");
					$.addLookup.close();
					Ti.App.fireEvent('addLookup', {
						message : "Property added successfully"
					});
				},
				error : function(error) {
				}
			});
		}
	}

});
