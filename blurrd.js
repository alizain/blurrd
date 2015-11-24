'use strict';

var P = require('bluebird'),
  gm = require('gm'),
  url = require('url'),
  cheerio = require('cheerio'),
  request = require('request');


module.exports = function(src, options) {

  return new P(function(resolve, reject) {

    var promises = [];

    var $ = cheerio.load(src),
      imgs = $(options.selector || 'img');

    imgs.each(function(index, el) {

      el = $(this);

      promises.push(new P(function(resolve, reject) {

        var src = el.attr('src'),
          downloadSrc = url.parse(src);

        if (options.downloadProtocol) {
          downloadSrc.protocol = options.downloadProtocol;
        }

        request({
          url: url.format(downloadSrc),
          encoding: null
        }, function(err, res, body) {

          if(err) {

            reject(err);

          } else {

            gm(body)
              .resize(options.max || 24, options.max || 24)
              .noProfile()
              .quality(options.quality || 60)
              .strip()
              .type('optimize')
              .toBuffer('JPG', function(err, raw) {

                if(err) {

                  reject(err);

                } else {

                  var dataUrl = 'data:image/jpg;base64,' + raw.toString('base64');
                  el.attr('src', dataUrl);
                  el = options.loader.transformImg(src, el, options);
                  resolve();

                }

              });

          }

        });

      }));

    });

    P.all(promises).then(function() {

      options.loader.inject($, options);

      resolve($.html());

    }, function(err) {

      reject(err);

    });

  });

};
