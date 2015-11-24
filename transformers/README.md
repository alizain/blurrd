# Custom Loaders

Must return an object which contains two functions - `transformImg` & `inject`


### `transformImg(src, imgEl, options)`

This function is called once for each image found in the document.

  - `src` The original src url of the image
  - `imgEl` A [cheerio](https://github.com/cheeriojs/cheerio) element
  - `options` Provided when running the parent script


### `inject($, options)`

Called once all images have been processed. As the name implies, inject the required scripts/stylesheets into the HTML here.

  - `$` The root [cheerio](https://github.com/cheeriojs/cheerio) instance
  - `options` Provided when running the parent script
