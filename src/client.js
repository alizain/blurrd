// nextTickFn = (function() {
//   var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
//   var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;
//   if (canSetImmediate) {
//     return function(f) {
//       return window.setImmediate(f)
//     };
//   }
//   if (canPost) {
//     var queue = [];
//     window.addEventListener('message', function(ev) {
//       var source = ev.source;
//       if ((source === window || source === null) && ev.data === 'process-tick') {
//         ev.stopPropagation();
//         if (queue.length > 0) {
//           var fn = queue.shift();
//           fn();
//         }
//       }
//     }, true);
//     return function nextTick(fn) {
//       queue.push(fn);
//       window.postMessage('process-tick', '*');
//     };
//   }
//   return function nextTick(fn) {
//     setTimeout(fn, 0);
//   };
// })();

(function(window) {

  'use strict';

  var imgs = window.jQuery('img[data-blurrd-loader]');

  console.log(imgs);

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
