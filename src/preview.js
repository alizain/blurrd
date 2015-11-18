'use strict';

var gm = require('gm');

/**
 * Image Preview Generator
 */

module.exports = {

  /**
   * Reduce source image to specified dimensions
   * @param  {String|Buffer} src - string file path or actual image data as buffer
   * @param  {Integer} max - width/height constraint for image
   * @param  {Function} cb - (err, img)
   */
  reduce: function(src, max, cb) {
    gm(src)
      .resize(max, max)
      .noProfile()
      .quality(60)
      .strip()
      .type('optimize')
      .toBuffer('JPG', cb);
  },

  /**
   * Reduce source image to specified dimenions and return image url
   * @param  {String|Buffer} src - string file path or actual image data as buffer
   * @param  {Integer} max - width/height constraint for image
   * @param  {Function} cb - (err, img, raw)
   */
  generate: function(src, max, cb) {
    this.reduce(src, max, function(err, raw) {
      if(err) {
        cb(err, null);
      } else {
        cb(null, 'data:image/jpeg;base64,' + raw.toString('base64'));
      }
    });
  }

};
