const util = require('util');

const request = require('request');

const feed_api_endpoint=process.env.ENDPOINT || "https://56vwcxeu8c.execute-api.ap-southeast-1.amazonaws.com/test/feed";
console.log("Initialized Feed endpoint pointing to: " + feed_api_endpoint);

var payload = {"text": "这天是我必须开始运通减胖以及注意健康饮食。2016 Ford Mustang Ecoboost Coupe."}
var options = { 
	url:feed_api_endpoint,
	headers: { },
	// json: {"text": "hello from post Api Test using node request library"}
	json: payload
}

/*
console.log("signing request...");
console.log(aws4);

// var opts = {service: 's3', path: request.path};
var opts = {
	// 
	url: feed_api_endpoint,
	// host: '56vwcxeu8c.execute-api.ap-southeast-1.amazonaws.com',
	host: 'api.demolab.host', 
	path: "/feed",
    method: "GET",
    region: "ap-southeast-1",
    service: "execute-api",
    body: JSON.stringify(payload)
};
var aws_access_key_id = process.env.AWS_ACCESS_KEY_ID;
var aws_secret_access_key = process.env.AWS_SECRET_ACCESS_KEY;
console.log("options:" + util.inspect(opts));

var awsObj = aws4.sign(opts, {accessKeyId: aws_access_key_id, secretAccessKey: aws_secret_access_key});

console.log("Signature done:");
console.log(awsObj);


for (var header in awsObj.headers) {
    options.headers[header] = awsObj.headers[header];
}

console.log("Added request headers:");
console.log(options);
*/

request.post(options, (err, res, body) => {
  if (err) { return console.error(err); }
  console.info(res.statusCode + " " + res.statusMessage);
  console.info(res.body);
});
