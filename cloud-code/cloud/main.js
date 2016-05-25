
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("sendPush", function(request, response) {
  
      // var query = new Parse.Query(Parse.Installation);
      // query.equalTo('subscriptions', 'RCjcetYw1u');
		var message = request.params.message;
		    if (message != null && message !== "") {
		        message = message.trim();
		    } else {
		     response.error("Must provide \"message\" in JSON data");
		     return;
		    }
		 
		    // Can see this at https://www.parse.com/apps/{APP_NAME}/cloud_code/log
		    // var logMessage = "Sending \"{0}\" to all installations".format(message);
		    // console.log(logMessage);
		             
		    var pushQuery = new Parse.Query(Parse.Installation);
			pushQuery.equalTo("subscriptions", request.params.userid);
		    // pushQuery.containedIn("deviceType", ["ios", "android"]); // errors if no iOS certificate

		    // Send push notification to query
		    Parse.Push.send({
		        where: pushQuery, // Set our installation query
		        data: {
		            alert: message
		            }
		        }, {
		        success: function () {
		            // Push was successful
		            console.log("Message was sent successfully");
		            response.success("Message was sent successfully");
		        },
		        error: function (error) {
		            response.error(error);
		        }
		    });
});
Parse.Cloud.define("getNumPush", function(request, response) {
			 Parse.Cloud.useMasterKey();
		    var query = new Parse.Query(Parse.Installation);
	        query.equalTo("subscriptions", request.params.id);
	        query.find({//get coupons
	          success: function(results) {
	            response.success(results.length);
	        
	        },
	          error: function(error) {
	            response.error(error);
	            }
	        });


});
