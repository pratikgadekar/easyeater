var args = arguments[0] || {};

$.feedbackAdminList.left = Ti.Platform.displayCaps.platformWidth;
$.topViewBack.headerLabel.text = "Feedback";
$.topViewBack.addView.visible = false;

$.topViewBack.menuImgView.addEventListener('click', function(e) {
	$.feedbackAdminList.close(slide_it_right);

});
