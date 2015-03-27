var args = arguments[0] || {};
$.editProfile.left = Ti.Platform.displayCaps.platformWidth;
$.topViewBack.headerLabel.text = "Edit Profile";
$.topViewBack.addView.visible = false;

$.topViewBack.menuImgView.addEventListener('click', function(e) {
	$.editProfile.close(slide_it_right);

});

if (Parse.User.current()) {
	//Ti.API.info(Parse.User.current());
	$.userName.value = Parse.User.current().attributes.username;
	$.email.value = Parse.User.current().attributes.email;
	$.firstName.value = Parse.User.current().attributes.firstName;
	$.lastName.value = Parse.User.current().attributes.lastName;
}

$.update.addEventListener('click', function(e) {
	if ($.userName.value == '' || $.email.value == '' || $.firstName.value == '' || $.lastName.value == '') {
		alert("All fields are mendetory");
	} else {
		var currentUser = Parse.User.current();
		currentUser.set("username", $.userName.value);
		currentUser.set("email", $.email.value);
		currentUser.set("firstName", $.firstName.value);
		currentUser.set("lastName", $.lastName.value);
		currentUser.save(null, {
			success : function(saveUser) {
				alert("Profile updated succesfully");
			},
			error : function(userAgain, error) {
				// This will error, since the Parse.User is not authenticated
				alert("Error: " + error.code + " " + error.message);
			}
		});
	}

});

$.resetPassword.addEventListener('click', function(e) {
	Parse.User.requestPasswordReset(Parse.User.current().attributes.email, {
		success : function() {
			// Password reset request was sent successfully
			alert("Password reset link send to your email.");
		},
		error : function(error) {
			// Show the error message somewhere
			alert("Error: " + error.code + " " + error.message);
		}
	});
});
