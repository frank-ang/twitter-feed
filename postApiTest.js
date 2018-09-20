const util = require('util');

const request = require('request');

const feed_api_endpoint="https://56vwcxeu8c.execute-api.ap-southeast-1.amazonaws.com/test/feed";

var options={ 
	url:feed_api_endpoint,
	json: {"text": "hello from post Api Test using node request library"}
}
request.post(options, (err, res, body) => {
  if (err) { return console.error(err); }
  console.info(res.statusCode + " " + res.statusMessage);
  console.info(res.body);
});
