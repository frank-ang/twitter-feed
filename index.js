const Twitter = require('twitter');
const request = require('request');
const util = require('util');
const aws = require('aws-sdk'); 

const phrases=process.env.PHRASES || "xoyxoz";
const feed_api_endpoint=process.env.ENDPOINT || "https://56vwcxeu8c.execute-api.ap-southeast-1.amazonaws.com/test/feed";
const configS3Bucket=process.env.CONFIG_S3_BUCKET || 'frankang-secure-config';
const configS3Key=process.env.CONFIG_S3_KEY || 'demo/twitter-config.json';

function initialize() {
    // Read config from S3. TODO better way is use secrets manager.
    const s3 = new aws.S3();

    var getParams = {
        Bucket: configS3Bucket,
        Key: configS3Key
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
        // console.info(JSON.stringify(tweet).replace(/[\r\n]+/g, '\n')); // log json on single line.

        // Post feed to API Gateway.
        console.info("calling API GW");
        var options = { 
            url:feed_api_endpoint,
            json: tweet.text
        }
        request.post(options, (err, res, body) => {
          if (err) { 
            console.error("Error while posting feed to API GW, status: " + res.statusCode + ", " + res.statusMessage);
            console.error(res.body);
            return console.error(err);
          } else {
            console.log("Posted feed to API Gateway. Tweet text: " + tweet.text)
          }

        });

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
