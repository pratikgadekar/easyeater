var user = require('cloud/user/user.js')
var lookup = require('cloud/lookup/lookup.js');
var menu = require('cloud/menu/menu.js');



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

//for lookup table
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
 
 