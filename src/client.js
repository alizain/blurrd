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

  var imgs = window.jQuery('.blurrd-img');

  imgs.each(function(index, el) {
    processImage(el);
  });

  function processImage(el) {

    console.log('processing');

    el = $(el);

    var src = (el).data('blurrd-src');
    var proxy = new Image();

    proxy.onload = function() {

      el.attr('src', src);
      el.removeClass('blurrd-active');

    };

    proxy.src = src;

  }

})(window);
