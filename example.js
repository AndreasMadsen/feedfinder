var request = require('request');
var endpoint = require('endpoint');
var feedfinder = require('feedfinder');

request('http://www.nytimes.com/')
  .pipe(feedfinder('http://www.nytimes.com/'))
  .pipe(endpoint({objectMode: true}, function (err, links) {
    console.log(err, links);
  }));
