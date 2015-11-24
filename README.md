# Blurrd

Generate blurred previews for images! Checkout the [video demo](https://www.youtube.com/watch?v=4HTpcauWaLs). Uses [cheerio](https://github.com/cheeriojs/cheerio) under the hood to parse HTML.

Compatible with [jquery_lazyload](https://github.com/tuupola/jquery_lazyload)!

## Install

```javascript
npm install blurrd
```

## Usage - API

Require/import it in your application
```javascript
var blurrd = require('blurrd');
```

It returns a promise

```javascript
blurrd(src, options)
  .then(function(result) {
    fs.writeFileSync('output.html', result, 'utf8');
  });
```

#### `src`

The HTML source that needs to be processed

#### `options`

An object with the following possible values (defaults are shown);

```javascript
options: {
  // options hash to pass on to cheerio
  cheerio: {},
  // selector used by cheerio to get all images
  selector: 'img',
  // maximum dimensions of processed image.
  // increasing this will dramatically increase
  // the size of the initial page load
  max: 24,
  // quality factor for graphicsmagick
  quality: 60,
  // used when the src in an image does not have a protocol
  dlProtocol: 'http:',
  // the default transformer
  transformer: 'basic',
  // options to pass on to the transformer
  transformerOpts: {
    // options hash to pass on to the transformer
  }
}
```

## Available Transformers

blurrd is really flexible. You can use different strategies/techniques to display the image preview and load the actual image in the browser. There are two bundled in transformers - `basic` & `lazyload`

#### `basic`

The built in transformer that works end-to-end. The following config options are available:

```javascript
transformerOpts = {
  // whether to inject the default css into the page
  injectCSS: true,
  // whether to minify the css before injecting
  minifyCSS: true,
  // whether to inject the default js into the page
  injectJS: true,
  // whether to minify the js before injecting
  minifyJS: true,
  // css transition duration
  transitionDuration: 0.8, // in seconds
  // how long to wait after image load to replace blurred preview with original. helps avoid flicker when images are cached by the browser
  minimumWait: 0.25, // in seconds
  // css blur amount
  blurAmount: 10,
}
```

## Usage - Command Line

```shell
blurrd [options] <file>
```

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
