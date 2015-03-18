var args = arguments[0] || {};

$.menuImgView.addEventListener('click', function(e) {
	
	Ti.App.fireEvent('menuButtonClick');
});
