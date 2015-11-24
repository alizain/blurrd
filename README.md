# Blurrd

Generate blurred previews for images! Checkout the [video demo](https://www.youtube.com/watch?v=4HTpcauWaLs)

Uses [cheerio](https://github.com/cheeriojs/cheerio) to parse HTML.

## Install

```
npm install blurrd
```

## Usage - API

Require/import it in your application
```
var blurrd = require('blurrd');
```

Run it!

```
// returns a promise
blurrd(src, options)
  .then(function() {

  });
```

**`src`**

The HTML source that needs to be process

#### `options`

An object used to configure the processor

```
options: {
  cheerio: {
    // options hash to pass on to cheerio
  },
  selector: 'img',
  max: 24,
  quality: 60,
  dlProtocol: 'http:',
  transformer: 'basic',
  transformerOpts: {
    // options hash to pass on to the transformer
  }
}
```

## Usage - Command Line

`blurrd [options] <file>`

The command line version doesn't have the full flexibility of the

```
Available Options:

  -h, --help                 output usage information
  -V, --version              output the version number
  -s, --selector [value]     Image selector for cheerio
  -t, --transformer [value]  lazyload|basic (default)
  -q, --quality [value]      Image compression quality factor
  -m, --max [value]          Maximum image dimensions
  -o, --out [value]          Output file
```

## Custom Transformers

Custom transformers must be an object with two methods - `prepareImg` & `inject`.

#### `prepareImg(srcUrl, imgBuffer, imgEl, options)`

This function is called once for each image found in the document.

  - `srcUrl` The original src url of the image
  - `imgBuffer` Image preview (instance of `Buffer`)
  - `imgEl` A [cheerio](https://github.com/cheeriojs/cheerio) element
  - `options` Provided when running the parent script (as `transformerOpts`)


#### `inject($, options)`

Called once all images have been processed. As the name implies, inject the required scripts/stylesheets into the HTML here.

  - `$` The root [cheerio](https://github.com/cheeriojs/cheerio) instance
  - `options` Provided when running the parent script (as `transformerOpts`)

See the [`basic`](https://github.com/alizain/blurrd/blob/master/transformers/basic.js) or [`lazyload`](https://github.com/alizain/blurrd/blob/master/transformers/lazyload.js) transformer for more details.
