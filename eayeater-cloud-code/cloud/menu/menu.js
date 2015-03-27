
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
var Menu = Parse.Object.extend("Menu");
var Lookup = Parse.Object.extend("Lookup");

var Response = {
    EmptyParameters: 'Some parameters empty',
    InternalServerError: 'Oops! Some error occurred!',
    SaveSuccess: 'Lookup save successfully!'
}


exports.save = function(params) {
 
    if(!params || !params.name || !params.price || !params.cusine_type_id || !params.discription || !params.menu_type){
        params.error(Response.EmptyParameters);
    }else{
    	 
        	var menu = new Menu();
        	menu.set("name",params.name);
        	menu.set("price",params.price);
        	menu.set("discription",params.discription);
          menu.set("menu_type",params.menu_type);

        	var lookup = new Lookup();
        	lookup.id = params.cusine_type_id;
        	menu.set("cusine_type_id",lookup);

          	menu.save(null, {
            success: function(menu) {
                params.success(Response.SaveSuccess);
            },
             error: function(error) {
              console.log("getting error: " + error.message);
              params.error(error + "error ");
             }
            });



    } 
}

exports.update = function(params) {
 
    if(!params || !params.id || !params.name || !params.price || !params.cusine_type_id || !params.discription || !params.menu_type){
        params.error(Response.EmptyParameters);
    }else{
       

       var query = new Parse.Query(Menu);
        query.equalTo("objectId", params.id);
        query.first({
          success: function(menu) {
            // Successfully retrieved the object.
		            
		        	menu.set("name",params.name);
		        	menu.set("price",params.price);
		        	menu.set("discription",params.discription);
              menu.set("menu_type",params.menu_type);

		        	var lookup = new Lookup();
		        	lookup.id = params.cusine_type_id;
		        	menu.set("cusine_type_id",lookup);

		          	menu.save(null, {
		            success: function(menu) {
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

 
