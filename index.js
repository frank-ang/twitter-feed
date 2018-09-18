var Twitter = require('twitter');
const util = require('util');

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
                console.log(err);
                reject(err);
            } else {
                console.log("Read config from S3: success")
                return resolve(JSON.parse(data.Body.toString()));
            }
        })
    })
} 

function stream(params) {
    // create Twitter feed
    var client = new Twitter(params);
    // client.get('statuses/user_timeline', params, function(error, tweets, response) {
    //  if (!error) {
    //    console.log(tweets);
    console.log("Streaming...");
    client.stream('statuses/filter', {track: 'xoyxoz'},  function(stream) {
      stream.on('data', function(tweet) {
        console.log("Tweet Text: " + tweet.text);
        console.log(util.inspect(tweet));
      });
      stream.on('error', function(error) {
        console.log(error);
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
