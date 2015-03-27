// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

var _ = require('underscore');
require('ti.parse');

//Get your  Keys here: https://www.parse.com/apps/quickstart#js/blank
//Parse.initialize("Application ID", "Javascript Key", "Master Key");

Parse.initialize("IPZGcRU58ew1FkZopIbcIbu53dY2hVVprAZER4tD", "fQ9rTCNgVGNkvEQVw3Vyaw3fq6nktcTVO7jyHlyX", "sIBROyaVAUPaB146V4ntMkcc38nul2gYGKi9FhZE");

var slide_it_left = Titanium.UI.createAnimation();
slide_it_left.left = 0; // to put it back to the left side of the window
slide_it_left.duration = 300;


var paltformWidth = Ti.Platform.displayCaps.platformWidth;
var slide_it_right = Titanium.UI.createAnimation();
slide_it_right.left = paltformWidth; // or -640
slide_it_right.duration = 300;