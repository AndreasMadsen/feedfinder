
var feedfinder = require('feedfinder');
var startpoint = require('startpoint');
var endpoint = require('endpoint');
var test = require('tap').test;

test('simple html fragment test', function (t) {
  var html = '<link rel="alternate" type="application/rss+xml" href="feed.rss">\n' +
             '<link rel="alternate" type="application/atom+xml" href="feed.atom">\n' +
             '<link rel="alternate" type="application/rdf+xml" href="feed.rdf">';

  startpoint(html)
    .pipe(feedfinder('http://localhost.test/page/index.html'))
    .pipe(endpoint({objectMode: true}, function (err, links) {
      t.equal(err, null);
      t.deepEqual(links, [
        { type: 'rss', href: 'http://localhost.test/page/feed.rss' },
        { type: 'atom', href: 'http://localhost.test/page/feed.atom' },
        { type: 'rdf', href: 'http://localhost.test/page/feed.rdf' }
      ]);
      t.end();
    }));
});

test('simple error event', function (t) {
  var parser = feedfinder('http://localhost.test/page/index.html');

  parser.once('error', function (err) {
    t.equal(err.message, '.write() after done!');
    t.end();
  });

  parser._parser.end();
  parser._parser.write('Hi');
});
