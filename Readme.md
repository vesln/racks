[![Build Status](https://secure.travis-ci.org/vesln/racks.png)](http://travis-ci.org/vesln/racks)

# Important Notice

I'm no longer actively maintaining this project. If you are interested supporting it - [ping me on twitter](https://twitter.com/vesln).
The only thing that I will ask you is to not change the API drastically. If you are planning on doing that - better start a brand new project.

If you want me to transfer you only the name on npm, I'd be happy to only if the project **does not have any downloads on npm lately**. In case it's being
downloaded, there are people that depend on it and might step up and start maintaining, so I will not transfer it to you, regardless if you want to release
a new major version etc.

If you have any other questions, let me know.

Thanks!

Veselin

# racks

Reusable middleware implementation for Node.js & the browsers.

## Synopsis

```js
var Racks = require('racks');

var app = new Racks;

// Register middlewares

app.use(function(stuff, next) { // next will always be the last param
  next();
});

app.use(function(stuff, next) {
  next();
});

// Register a function, triggered after each callback

app.after(function(stuff, next) {
  console.log('Called after every single middleware');
  console.log('Useful for debugging or logging');
});

// Trigger

app.send(stuff); // you can pass as much args as you want

```

## Installation

Node.js:

```
$ npm install racks
```

Browser:

Download `racks.min.js`, it's all you need.

```html
<script src="racks.min.js"></script>
```

## Tests

Node.js:

```
$ npm install
$ make test
```

Browser:

- Clone the repository
- Open `test/browser/index.html` in your favourite browser

## License

(The MIT License)

Copyright (c) 2012 Veselin Todorov <hi@vesln.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
