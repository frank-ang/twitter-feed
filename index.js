var Twitter = require('twitter');
const util = require('util');

var phrases="xoyxoz";
var feed_api_endpoint="https://56vwcxeu8c.execute-api.ap-southeast-1.amazonaws.com/test/feed";

function initialize() {
    // Read config from S3.
    var aws = require('aws-sdk'); 
    var s3 = new aws.S3();
    var getParams = {
        Bucket: 'frankang-secure-config',
        Key: 'demo/twitter-config.json'
    }
    
    return new Promise(function(resolve, reject) {
        console.log("Reading config from S3");
        s3.getObject(getParams, function (err, data) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.info("Read config from S3: success")
                return resolve(JSON.parse(data.Body.toString()));
            }
        })
    })
} 

function stream(params) {
    // create Twitter feed
    var client = new Twitter(params);
    console.info("Streaming for phrases: " + phrases);
    client.stream('statuses/filter', {track: phrases},  function(stream) {

      stream.on('data', function(tweet) {
        console.info("Received Tweet. Text: " + tweet.text);
        console.info(util.inspect(tweet).join(' ')); // log json on single line.
        // Call API Gateway.
        console.info("calling API GW");

      });
      stream.on('error', function(error) {
        console.error(error);
      });

    });
}

function main() {

    var initializePromise = initialize();
    initializePromise.then(function(params) { 
        console.debug("got twitter config. starting stream.");
        stream(params);
    });
}

main();
