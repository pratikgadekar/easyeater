var user = require('cloud/user/user.js')
var lookup = require('cloud/lookup/lookup.js');
var menu = require('cloud/menu/menu.js');
var order = require('cloud/order/order.js');
var feedback = require('cloud/feedback/feedback.js');

var Menu = Parse.Object.extend('Menu');

//for user table
Parse.Cloud.define("saveUser", function(req, res) {
    if(req.params.id) {
            user.update({
                id:req.params.id,
                userName: req.params.userName,
                password: req.params.password,
                firstName: req.params.firstName,
                lastName: req.params.lastName,
                email: req.params.email,
                organizationName: req.params.organizationName,
                success: function(message) {
                    res.success(message);
                },
                error: function(message) {
                    res.error(message);
                }
            });
    } else {
 
        user.save({
            userName: req.params.userName,
            password: req.params.password,
            firstName: req.params.firstName,
            lastName: req.params.lastName,
            email: req.params.email,
            organizationName: req.params.organizationName,
            success: function(message) {
                res.success(message);
            },
            error: function(message) {
                res.error(message);
            }
        });
}
});


//for lookup table
Parse.Cloud.define("lookupSave", function(req, res) {
if(req.params.id) {
            lookup.update({
            	id: req.params.id,
               name: req.params.name,
               type: req.params.type,
               success: function(message) {
                res.success(message);
                console.log(message);
               },
               error: function(message) {
                 console.log(message);
               }
            });
        } else {
        	lookup.save({
               name: req.params.name,
               type: req.params.type,
               success: function(message) {
                res.success(message);
                console.log(message);
               },
               error: function(message) {
                 console.log(message);
               }
            });
        }

});

//for menu table
Parse.Cloud.define("menuSave", function(req, res) {
if(req.params.id) {
            menu.update({
            	id: req.params.id,
               name: req.params.name,
               price: req.params.price,
               menu_type_id: req.params.menu_type_id,
               discription: req.params.discription,
               success: function(message) {
                res.success(message);
                console.log(message);
               },
               error: function(message) {
                 console.log(message);
               }
            });
        } else {
        	menu.save({
               name: req.params.name,
               price: req.params.price,
               menu_type_id: req.params.menu_type_id,
               discription: req.params.discription,
               success: function(message) {
                res.success(message);
                console.log(message);
               },
               error: function(message) {
                 console.log(message);
               }
            });
        }

});


Parse.Cloud.define("saveOrderList", function(req, res) {

            order.save({
            	table_no: req.params.table_no,
                name: req.params.name,
                phone_no: req.params.phone_no,
                orders: req.params.orders,
               success: function(message) {
                res.success(message);
                console.log(message);
               },
               error: function(message) {
                 console.log(message);
               }
            });
});
 
Parse.Cloud.beforeSave('Orderlist', function(req, res) {
	var orderList = req.object;
	if(orderList) {
		var menu = orderList.get('menu');
		var quantity = orderList.get('quantity');
		var menuQuery = new Parse.Query(Menu);
		menuQuery.get(menu.id, {
			success: function(menu) {
				if(menu) {
					var price = menu.get('price');
					var total = parseInt(price) * parseInt(quantity);
					orderList.set('amount', total);
					orderList.set('status', 1);
					res.success();
				} else {
					res.error('No menu found');
				}
			},
			error: function(error) {
				res.error(error.message);
			}
		});
	} else {
		res.error('No object found');
	}
});


//feedback

Parse.Cloud.define("saveFeedback", function(req, res) {

         feedback.save({
            phone_no: req.params.phone_no,
            name: req.params.name,
            rating: req.params.rating,
            description: req.params.description,
            success: function(message) {
                res.success(message);
            },
            error: function(message) {
                res.error(message);
            }
        });

});












