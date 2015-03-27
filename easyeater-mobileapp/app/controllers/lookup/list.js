var args = arguments[0] || {};

$.lookupList.left = Ti.Platform.displayCaps.platformWidth;
$.topViewBack.headerLabel.text = "Lookup";

$.topViewBack.menuImgView.addEventListener('click', function(e) {
	$.lookupList.close(slide_it_right);

});

$.topViewBack.addView.addEventListener('click', function(e) {
	Alloy.createController('lookup/add').getView().open(slide_it_left);
});

lookupListData();

function lookupListData() {
	var Lookup = Parse.Object.extend("Lookup");
	var query = new Parse.Query(Lookup);
	query.find({
		success : function(lookups) {

			// Do something with the returned Parse.Object values
			Ti.API.info(JSON.stringify(lookups));
			if (lookups) {
				var _data = [];
				_.each(lookups, function(_l) {
					Ti.API.info("Lookups " + JSON.stringify(_l));
					var _lookup = _l.toJSON();
					_data.push({
						name : {
							text : _lookup.name,

						},
						tick : {
							visible : false,
						},
						properties : {
							itemId : _l.id,
							selectedBackgroundColor : "transparent",
							selectedColor : 'transparent',
							title : _lookup.name,
							//accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK

						}
					});
				});

				var section = Ti.UI.createListSection({
					items : _data,
					font : {
						fontFamily : 'Helvetica Neue',
						fontSize : "16dp",
						fontWeight : "normal"
					},
					color : "#595959",
				});

				$.lookupNameList.sections = [section];
			}

		},
		error : function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
}

$.lookupNameList.addEventListener('itemclick', function(e) {
	//Ti.API.info(e.itemId);
	Ti.API.info(e.itemId);
	var Lookup = Parse.Object.extend("Lookup");
	var query = new Parse.Query(Lookup);
	query.equalTo("objectId", e.itemId);
	query.first({
		success : function(object) {
			// Successfully retrieved the object.
			Ti.API.info("object" + JSON.stringify(object));
			var data = {
				page : "edit",
				lookupObject : object
			};
			Alloy.createController('lookup/add', data).getView().open(slide_it_left);
		},
		error : function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});

});

var addLookup = function(evtData) {
	//alert('The value of message = ' + evtData.message);
	$.lookupNameList.removeAllChildren();
	lookupListData();
};

Ti.App.addEventListener('addLookup', addLookup);
