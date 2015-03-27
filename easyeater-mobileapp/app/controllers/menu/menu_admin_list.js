var args = arguments[0] || {};

$.menuAdminList.left = Ti.Platform.displayCaps.platformWidth;
$.topViewBack.headerLabel.text = "Menu";

$.topViewBack.menuImgView.addEventListener('click', function(e) {
	$.menuAdminList.close(slide_it_right);

});

$.topViewBack.addView.addEventListener('click', function(e) {
	Alloy.createController('menu/add').getView().open(slide_it_left);
});

$.vegTab.addEventListener('click', function(e) {
	$.scrollableView.scrollToView(0);
	$.nonvegselected.visible = false;
	$.vegselected.visible = true;
});
$.nonvegTab.addEventListener('click', function(e) {
	$.scrollableView.scrollToView(1);
	$.vegselected.visible = false;
	$.nonvegselected.visible = true;
});

$.scrollableView.addEventListener('scrollend', function(e) {
	Ti.API.info(e.currentPage);

	if (e.currentPage == 0) {
		$.nonvegselected.visible = false;
		$.vegselected.visible = true;
	}

	if (e.currentPage == 1) {
		$.vegselected.visible = false;
		$.nonvegselected.visible = true;

	}
});
