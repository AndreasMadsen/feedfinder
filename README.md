#feedfinder

> Transform stream there extracts feed links from a HTML page

## Installation

```sheel
npm install feedfinder
```

## Documentation

`feedfinder` is a transform stream there takes a buffer stream and outputs
an object stream. The function requires a source url as first argument there
is used to calculate the absolute url of a feed.

The objects has two properties `type` and `href`.
* `type` can be `rss`, `atom` or `rdf`
* `href` is the absolute url to the feed.

```javascript
var request = require('request');
var endpoint = require('endpoint');
var feedfinder = require('feedfinder');

request('http://www.nytimes.com/')
  .pipe(feedfinder('http://www.nytimes.com/'))
  .pipe(endpoint({objectMode: true}, function (err, links) {
    console.log(links);
    // [{
    //  type: 'rss',
    //  href: 'http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml'
    // }]
  }));
```

##License

**The software is license under "MIT"**

> Copyright (c) 2013 Andreas Madsen
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.
