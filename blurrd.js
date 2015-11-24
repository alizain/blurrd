'use strict';

var _ = require('lodash'),
  gm = require('gm'),
  url = require('url'),
  path = require('path'),
  cheerio = require('cheerio'),
  request = require('request');

if(typeof Promise !== 'function') {
  var Promise = require('bluebird');
}

module.exports = function(src, options) {

  return new Promise(function(resolve, reject) {

    var funcs;

    options = _.merge({
      cheerio: {},
      selector: 'img',
      max: 24,
      quality: 60,
      dlProtocol: 'http:',
      transformer: 'basic',
      transformerOpts: {}
    }, options);

    if(typeof options.transformer === 'object') {

      funcs = options.transformer;

    } else if(typeof options.transformer === 'string') {

      try {
        funcs = require(options.transformer);
      } catch(err) {
        funcs = undefined;
      }

      if(!funcs) {
        try {
          funcs = require(path.join(__dirname, 'transformers', options.transformer));
        } catch(err) {
          throw new Error(options.transformer + ' is not a valid path or one of the default transformers');
        }
      }

    } else {

      throw new Error('malformed option for transformer');

    }

    [
      'prepareImg',
      'boo',
      'inject'
    ].forEach(function(key) {
      if(typeof funcs[key] !== 'function') {
        throw new Error(`transformer must have a ${key} function`);
      }
    });

    var imgPromises = [];

    var $ = cheerio.load(src, options.cheerio),
      imgElements = $(options.selector);

    imgElements.each(function(index, el) {

      el = $(this);

      imgPromises.push(new Promise(function(resolve, reject) {

        var src = el.attr('src'),
          dlSrc = url.parse(src);

        if (!dlSrc.protocol) {
          dlSrc.protocol = options.dlProcotol;
        }

        request({
          url: url.format(dlSrc),
          encoding: null
        }, function(err, res, body) {

          if(err) {

            reject(err);

          } else {

            gm(body)
              .resize(options.max, options.max)
              .noProfile()
              .quality(options.quality)
              .strip()
              .type('optimize')
              .toBuffer('JPG', function(err, raw) {

                if(err) {

                  reject(err);

                } else {

                  funcs.prepareImg(src, raw, el, options.transformerOpts);
                  resolve();

                }

              });

          }

        });

      }));

    });

    Promise.all(imgPromises).then(function() {

      funcs.inject($, options.transformerOpts);
      resolve($.html());

    }, function(err) {

      reject(err);

    });

  });

};
