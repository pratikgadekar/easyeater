var user = require('cloud/user/user.js')


//for user table
Parse.Cloud.define("saveUser",function(req, res){
		user.save({
			username: req.params.username,
			email: req.params.email,
			password: req.params.password,
      name: req.params.name,
            success: function(message) {
            res.success(message);
            },
            error: function(message) {
            res.error(message);
            }
      });
   
});
