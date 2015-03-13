var user = require('cloud/user/user.js')
var lookup = require('cloud/lookup/lookup.js').lookup;

//for lookup table
Parse.Cloud.define("lookupSave", function(req, res) {
    if(req.params.id) {
            lookup.update({
                id:req.params.id,
                name: req.params.name,
                type: req.params.type,
                updatedAt: req.params.updatedAt,
                updatedBy: req.params.updatedBy,
                createdAt: req.params.createdAt,
                createdBy: req.params.createdBy,
                isDisabled: req.params.isDisabled,
                success: function(message) {
                    res.success(message);
                },
                error: function(message) {
                    res.error(message);
                }
            });
    } else{
            lookup.save({
               name: req.params.name,
               type: req.params.type,
               updatedAt: req.params.updatedAt,
               updatedBy: req.params.updatedBy,
               createdAt: req.params.createdAt,
               createdBy: req.params.createdBy,
               isDisabled: req.params.isDisabled,
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

