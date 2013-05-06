
var HTMLParser = require('htmlparser2').Parser;
var stream = require('stream');
var url = require('url');
var util = require('util');

// Maps type attributes to format name
var TYPES = {
  'application/atom+xml': 'atom',
  'application/rss+xml': 'rss',
  'application/rdf+xml': 'rdf'
};

// Transform a stream containing HTML intro objects containing
// href and type properties.
function FeedFinder(sourceUrl) {
  if (!(this instanceof FeedFinder)) return new FeedFinder(sourceUrl);
  var self = this;

  stream.Transform.call(this, {
    objectMode: true
  });

  // Create a HTML parse object
  this._parser = new HTMLParser({
    onopentag: function (name, attr) {
      if (name === 'link' &&
          attr.rel === 'alternate' &&
          TYPES.hasOwnProperty(attr.type) &&
          typeof attr.href === 'string') {

        // Found valid link tag, output it as an object
        // with a type property and a absolute href property
        self.push({
          type: TYPES[attr.type],
          href: url.resolve(sourceUrl, attr.href)
        });
      }
    },
    onerror: function (err) {
      self.emit('error', err);
    }
  });
}
util.inherits(FeedFinder, stream.Transform);
module.exports = FeedFinder;

FeedFinder.prototype._transform = function (chunk, encoding, done) {
  this._parser.write(chunk);
  done(null);
};

FeedFinder.prototype._flush = function () {
  this._parser.end();
  this.push(null);
};
