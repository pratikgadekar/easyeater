
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
var Lookup = Parse.Object.extend("Lookup");

var Response = {
    EmptyParameters: 'Some parameters empty',
    InternalServerError: 'Oops! Some error occurred!',
    SaveSuccess: 'Lookup save successfully!'
}


exports.save = function(params) {
 
    if(!params || !params.name || !params.type){
        params.error(Response.EmptyParameters);
    }else{
    	 
        	var lookup = new Lookup();
        	lookup.set("name",params.name);
        	lookup.set("type",params.type);
          lookup.save(null, {
            success: function(lookup) {
                params.success(Response.SaveSuccess);
            },
             error: function(error) {
                  params.error(error + "error ");
             }
            });



    } 
}

exports.update = function(params) {
 
    if(!params || !params.id || !params.name || !params.type){
        params.error(Response.EmptyParameters);
    }else{
       

       var query = new Parse.Query(Lookup);
        query.equalTo("objectId", params.id);
        query.first({
          success: function(lookup) {
            // Successfully retrieved the object.
            lookup.set("name",params.name);
            lookup.set("type",params.type);
            lookup.save(null, {
            success: function(lookup) {
                params.success(Response.SaveSuccess);
            },
            error: function(error) {
                  params.error(error + "error ");
            }
            });
 
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });



    } 
}

 
