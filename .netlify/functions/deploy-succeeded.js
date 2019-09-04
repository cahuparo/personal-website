exports.handler = function(event, context, callback) {
  var e = JSON.parse(event.body);
  const { WEBSUB_HUB } = process.env;
  if (e.payload.context == "production") {
    console.log("[WebSub] preparing to ping " + WEBSUB_HUB)
    const request = require('request');
    request.post(
      `WEBSUB_HUB?hub.mode=publish&hub.url=${e.payload.url}/*`,
      function (error, response, body){
        if (!error && response.statusCode == 204) {
          console.log("[WebSub] ping successful");
          callback(null, {statusCode: 204});
        } else {
          console.log("[WebSub] ping failed:", error);
          callback(error, {statusCode: response.statusCode});
        }
      }
    );
  } else {
    console.log("[WebSub] ping to " + WEBSUB_HUB + " suppressed in non-production context");
    callback(null, {statusCode: 200});
  }
}
