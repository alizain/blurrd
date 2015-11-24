(function(window) {

  'use strict';

  var imgs = window.jQuery('img[data-blurrd-loader]');

  imgs.each(function(index, el) {
    processImage(el);
  });

  function processImage(el) {

    var $el = $(el),
      id = $el.attr('id'),
      src = $el.attr('src'),
      $actual = $('img[data-blurrd-src="' + id + '"]');

    el.onload = function() {

      $actual.attr('src', src);

      $actual.removeClass('blurrd-active');

      window.setTimeout(function() {

        $actual
          .removeClass('blurrd-img')
          .removeClass('blurrd-transition');
        $el.remove();

      }, 1000);

    };


  }

})(window);
