'use strict';

var fs = require('fs');

function id(len) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for(var i=0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

module.exports = {

  transformImg(src, imgEl, opts) {
    var curr = id(6);
    imgEl.attr('data-blurrd-src', curr);
    imgEl.prepend('<img src="' + src + '" data-blurrd-loader id="' + curr + '" style="display: none"/>');
    imgEl.addClass('blurrd-img')
      .addClass('blurrd-transition')
      .addClass('blurrd-active');
  },

  inject($, opts) {
    if(opts.cssPath) {
      $('head').prepend('<link rel="stylesheet" type="text/css" href="' + opts.cssPath + '"/>');
    } else {
      var css = fs.readFileSync('./client.css', 'utf8');
      $('head').prepend('<style id="blurrd-client-style">' + css + '</style>');
    }
    if(opts.jsPath) {
      $('body').append('<script id="blurrd-client-script" src="' + opts.jsPath + '"/>');
    } else {
      var js = fs.readFileSync('./client.js', 'utf8');
      $('body').append('<script id="blurrd-client-script">' + js + '</script>');
    }
  }

};
