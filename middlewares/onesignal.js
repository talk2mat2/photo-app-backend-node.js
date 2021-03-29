const sendNotification = function(data) {
    var headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "Basic ODQ3ZDg4MGMtMTExZS00ODU5LTg0OWItOGZiOTY2NTZkOTIz"
    };
    
    var options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/notifications",
      method: "POST",
      headers: headers
    };
    // ODQ3ZDg4MGMtMTExZS00ODU5LTg0OWItOGZiOTY2NTZkOTIz
    var https = require('https');
    var req = https.request(options, function(res) {  
      res.on('data', function(data) {
        console.log("Response:");
        console.log(JSON.parse(data));
      });
    });
    
    req.on('error', function(e) {
      console.log("ERROR:");
      console.log(e);
    });
    
    req.write(JSON.stringify(data));
    req.end();
  };
  
//   var message = { 
//     app_id: "6419071e-2c4d-43b0-906c-3704961722e1",
//     contents: {"en": "sup"},
//     include_external_user_ids: ["605e17222839b416d88c0b31"]
//   };
  
  module.exports = sendNotification;