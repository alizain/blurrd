# Loaders

Must return an object which contains two functions - `transformImg` & `inject`


### `transformImg(src, imgEl, options)`

This function is called once for each image found in the document.

`src` The original src url of the image.

`imgEl` A [cheerio](https://github.com/cheeriojs/cheerio) element.

`options` Provided when running the parent script.
