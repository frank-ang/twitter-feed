var Twitter = require('twitter');
var params = require('./config.js');
const util = require('util');

console.log("params: " + util.inspect(params));

var client = new Twitter(params);
/*
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});*/

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
