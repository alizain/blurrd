/*eslint-env browser*/
/*eslint strict: [2, "function"]*/

(function(window) {

  'use strict';

  var imgs = document.querySelectorAll('img[data-blurrd-loader]'),
    imgsLen = imgs.length;

  for (var i = 0; i < imgsLen; i++) {
    processImage(imgs[i]);
  }

  function processImage(el) {

    var id = el.getAttribute('id'),
      src = el.getAttribute('src'),
      actual = document.querySelector('img[data-blurrd-src="' + id + '"]');

    if(!actual) {
      return;
    }

    el.onload = function() {

      window.setTimeout(function() {

        window.requestAnimationFrame(function() {

          actual.setAttribute('src', src);

          actual.className = actual.className.replace('blurrd-active', '');

          window.setTimeout(function() {

            actual.className = actual.className
              .replace('blurrd-img', '')
              .replace('blurrd-transition', '');
            el.remove();

          }, parseInt(<%= transitionDuration %> * 1000));

        });

      }, parseInt(<%= minimumWait %> * 1000));

    };


  }

})(window);
