var Response = {
    EmptyParameters: 'Some parameters empty',
    InternalServerError: 'Oops! Some error occurred!',
    SaveSuccess: 'User save successfully!'
}
 
var Organization = Parse.Object.extend('Organization');
 
exports.save = function(params) {
 
    var re = /^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/igm;
 
    if(!params || !params.userName || !params.password || !params.firstName || !params.lastName || !params.email) {
        params.error(Response.EmptyParameters);
 
    } else {
        //var organization = new Organization();
        //organization.id = params.organizationId;
 
      //  var organization = new Organization();
       // organization.set('name', params.organizationName);
 
        var user = new Parse.User();
        user.set("username", params.userName);
        user.set("password", params.password);
        user.set("email", params.email);
        user.set("firstName", params.firstName);
        user.set("lastName", params.lastName);
        //user.set('organization', organization);
        user.signUp(null, {
          success: function(user) {
            // Hooray! Let them use the app now.
            params.success(Response.SaveSuccess);
          },
          error: function(user, error) {
            console.log('ERROR SAVING USER: ' + error.message);
            params.error(Response.InternalServerError);
          }
        });
    }
};
 
exports.update = function(params) {
    if(!params || !params.id || !params.userName || !params.password || !params.firstName || !params.lastName || !params.email) {
        params.error('Empty parameters! UPDATE');
    } else {

      Parse.Cloud.useMasterKey();
 
        var query = new Parse.Query(Parse.User);
        query.equalTo("objectId", params.id);
 
        query.first({
          success: function(user) {
            // Successfully retrieved the object.
            user.set("username", params.userName);
            user.set("password", params.password);
            user.set("email", params.email);
            user.set("firstName", params.firstName);
            user.set("lastName", params.lastName);
            user.save(null, {
              success: function(user) {
                // Hooray! Let them use the app now.
                params.success(user);
              },
              error: function(user, error) {
                // Show the error message somewhere and let the user try again.
                alert("Error: " + error.code + " " + error.message);
                params.error(error);
              }
            });
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
            params.error(Response.InternalServerError);
          }
        });
    }
};
 
 
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
