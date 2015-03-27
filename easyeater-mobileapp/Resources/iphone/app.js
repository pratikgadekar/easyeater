var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var _ = require("underscore");

require("ti.parse");

Parse.initialize("IPZGcRU58ew1FkZopIbcIbu53dY2hVVprAZER4tD", "fQ9rTCNgVGNkvEQVw3Vyaw3fq6nktcTVO7jyHlyX", "sIBROyaVAUPaB146V4ntMkcc38nul2gYGKi9FhZE");

var slide_it_left = Titanium.UI.createAnimation();

slide_it_left.left = 0;

slide_it_left.duration = 300;

var paltformWidth = Ti.Platform.displayCaps.platformWidth;

var slide_it_right = Titanium.UI.createAnimation();

slide_it_right.left = paltformWidth;

slide_it_right.duration = 300;

Alloy.createController("index");