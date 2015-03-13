var Response = {
    EmptyParameters: 'Some parameters empty',
    InternalServerError: 'Oops! Some error occurred!',
    SaveSuccess: 'User save successfully!'
}

exports.save = function(params){
   if(!params || !params.username || !params.email || !params.password) {
        params.error(Response.EmptyParameters);
    }else{

       var query = new Parse.Query(Parse.User);
        query.equalTo("username", username);

      query.first({
          success: function(user) {
            params.success(user);
          },
          error: function(error) {
            params.error(error);
            alert("Error: " + error.code + " " + error.message);
          }
        });
    }
};