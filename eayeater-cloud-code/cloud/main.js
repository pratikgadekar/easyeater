
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
// Parse.Cloud.define("hello", function(request, response) {
//   response.success("Hello world! 12356");
// });

var lookup = require('cloud/lookup/lookup.js');


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
    } else {
 
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
               },
               error: function(message) {
                res.error(message);
               }
            });
}
});

