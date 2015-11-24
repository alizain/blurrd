# Blurrd

Generate blurred previews for

### `blurrd(src, options)`

Where `src` is the HTML source that needs to be transformed and `options` is a hash of options to configure the generator.

#### `options`

max

options: {
  max: 48           // max dimensions of output image
  selector: 'img'   // cheerio selector for all images to blur
  dlProtocol: 'http:'           // path at which
}
```
