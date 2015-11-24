'use strict';

var _ = require('lodash'),
  fs = require('fs'),
  id = require('../utils/id'),
  path = require('path'),
  CleanCSS = require('clean-css'),
  UglifyJS = require('uglify-js');

module.exports = {

  defaults(options) {
    return _.merge({
      injectCSS: true,
      minifyCSS: true,
      injectJS: true,
      minifyJS: true,
      transitionDuration: 0.8,
      minimumWait: 0.25,
      blurAmount: 10,
    }, options);
  },

  prepareImg(srcUrl, imgBuffer, imgEl, options) {
    options = this.defaults(options);
    var curr = id(6);
    imgEl.attr('src', 'data:image/jpg;base64,' + imgBuffer.toString('base64'));
    imgEl.attr('data-blurrd-src', curr);
    imgEl.prepend('<img src="' + srcUrl + '" data-blurrd-loader id="' + curr + '" style="display: none"/>');
    imgEl.addClass('blurrd-img')
      .addClass('blurrd-transition')
      .addClass('blurrd-active');
  },

  inject($, options) {
    options = this.defaults(options);
    if(options.injectCSS) {
      var css = fs.readFileSync(path.join(__dirname, '..', 'client', 'basic.css'), 'utf8');
      css = _.template(css)(options);
      if(options.minifyCSS) {
        css = new CleanCSS().minify(css).styles;
      }
      $('head').prepend('<style id="blurrd-client-style">' + css + '</style>');
    }
    if(options.injectJS) {
      var js = fs.readFileSync(path.join(__dirname, '..', 'client', 'basic.js'), 'utf8');
      js = _.template(js)(options);
      if(options.minifyJS) {
        js = UglifyJS.minify(js, {fromString: true}).code;
      }
      $('body').append('<script id="blurrd-client-script">' + js + '</script>');
    }
  }

};
