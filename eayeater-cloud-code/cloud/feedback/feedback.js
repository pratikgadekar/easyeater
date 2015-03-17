

var Response = {
    EmptyParameters: 'Some parameters empty',
    InternalServerError: 'Oops! Some error occurred!',
    SaveSuccess: 'Feedback save successfully!'
}

var Feedback = Parse.Object.extend("Feedback");

exports.save = function(params) {
 
    if(!params || !params.phone_no || !params.name || !params.rating ){
        params.error(Response.EmptyParameters);
    }else{
    	 
        	var feedback = new Feedback();
        	feedback.set("phone_no", params.phone_no);
            feedback.set("name", params.name);
        	feedback.set("rating", params.rating);
        	feedback.set("description", params.description);
            feedback.save(null, {
            success: function(feedback) {
                params.success(Response.SaveSuccess);
            },
             error: function(error) {
                  params.error(error + "error ");
             }
            });



    } 
}