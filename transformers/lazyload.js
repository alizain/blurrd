'use strict';

var _ = require('lodash');

module.exports = {

  defaults(options) {
    return _.merge({
      addLazyClass: true
    }, options);
  },

  prepareImg(srcUrl, imgBuffer, imgEl, options) {
    options = this.defaults(options);
    if(options.addLazyClass) {
      imgEl.addClass('lazy');
    }
    imgEl.attr('src', 'data:image/jpg;base64,' + imgBuffer.toString('base64'));
    imgEl.attr('data-original', srcUrl);
  },

  inject($, options) {
    return;
  }

};
