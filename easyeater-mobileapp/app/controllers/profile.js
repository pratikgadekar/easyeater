var args = arguments[0] || {};

$.topView.headerLabel.text = "Profile";

if (Parse.User.current()) {
	$.loginView.visible = false;
	$.loginView.height = "0dp";
} else {
	$.UserDetails.visible = false;
	$.UserDetails.height = "0dp";
}

$.signIn.addEventListener('click', function(e) {
	//alert("abc");
	if ($.userName.value == '' || $.password.value == '') {
		alert("Invalid user name or password");
	} else {
		Parse.User.logIn($.userName.value.toLowerCase(), $.password.value, {
			success : function(user) {
				Ti.API.info("sucess" + JSON.stringify(user));
				$.loginView.visible = false;
				$.loginView.height = "0dp";
				$.UserDetails.visible = true;
				$.UserDetails.height = Ti.UI.SIZE;
				Ti.App.fireEvent('login');
				Ti.App.fireEvent('loginlogoutsucess', {
					value : "login"
				});
			},
			error : function(user, error) {
				// The login failed. Check error to see why.
				Ti.API.info("error" + JSON.stringify(error));
				alert("Invalid user name or password");
			}
		});
	}

});

$.logOut.addEventListener('click', function(e) {
	Parse.User.logOut();
	$.UserDetails.visible = false;
	$.UserDetails.height = "0dp";
	$.loginView.visible = true;
	$.loginView.height = Ti.UI.SIZE;
	Ti.App.fireEvent('loginlogoutsucess', {
		value : "logout"
	});
});


$.editProfile.addEventListener('click', function(){
	Alloy.createController('edit_profile').getView().open(slide_it_left);
});

$.lookup.addEventListener('click', function(){
	Alloy.createController('lookup/list').getView().open(slide_it_left);
});

$.menu.addEventListener('click', function(){
	Alloy.createController('menu/menu_admin_list').getView().open(slide_it_left);
});


$.feedback.addEventListener('click', function(){
	Alloy.createController('feedback/feedback_admin_list').getView().open(slide_it_left);
});


