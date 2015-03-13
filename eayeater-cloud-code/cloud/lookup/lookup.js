
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:

var Response = {
    EmptyParameters: 'Some parameters empty',
    InternalServerError: 'Oops! Some error occurred!',
    SaveSuccess: 'User save successfully!'
}


exports.save = function(params) {
 
    if(!params || !params.name || !params.type){
        params.error(Response.EmptyParameters);
    }else{
    	   var currentUser = Parse.User.current();
       
        	var lookup = new Lookup();
        	lookup.set("name",params.name);
        	lookup.set("type",params.type);
        	lookup.set("updatedAt",params.updatedAt);
        	lookup.set("updatedBy",params.updatedBy); //currentUser
        	lookup.set("createdAt",params.createdAt); 
        	lookup.set("createdBy",params.createdBy); //currentUser
            lookup.set("isDisabled",params.isDisabled); 
            lookup.save(null, {
            success: function(lookup) {
                params.success(Response.SaveSuccess);
            },
             error: function(error) {
                  params.error(error);
             }
            });



    } 
}
 
exports.update = function(params) {
    if(!params || !params.id || !params.name || !params.type){
        params.error(Response.EmptyParameters);
    }
    else{

    	var query = new Parse.Query(Lookup);
        query.equalTo("objectId", params.id);
        query.first({
          success: function(shop) {
          var currentUser = Parse.User.current();
          var lookup = new Lookup();
          lookup.set("name",params.name);
          lookup.set("type",params.type);
          lookup.set("updatedAt",params.updatedAt);
          lookup.set("updatedBy",params.updatedBy); //currentUser
          lookup.set("createdAt",params.createdAt); 
          lookup.set("createdBy",params.createdBy); //currentUser
          lookup.set("createdBy",params.createdBy); //currentUser
            lookup.save(null, {
	            success: function(lookup) {
	                params.success(Response.SaveSuccess);
	            },
	             error: function(error) {
	                  params.error(error);
                }
            });
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });
    }    
}
