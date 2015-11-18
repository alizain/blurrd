'use strict';

var P = require('bluebird'),
  fs = require('fs'),
  url = require('url'),
  cheerio = require('cheerio'),
  request = require('request'),
  preview = require('./src/preview');

function id(len) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(var i=0; i < len; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

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

        if (!downloadSrc.protocol) {
          downloadSrc.protocol = 'http:';
        }

        request({
          url: url.format(downloadSrc),
          encoding: null
        }, function(err, res, body) {

          if(err) {

            reject(err);

          } else {

            preview.generate(body, options.max || 24, function(err, data) {

              if(typeof data === 'string') {

                var curr = id(6);

                el.attr('src', data)
                  .attr('data-blurrd-src', curr);

                el.prepend('<img src="' + src + '" data-blurrd-loader id="' + curr + '" style="display: none"/>')

                el.addClass('blurrd-img')
                  .addClass('blurrd-transition')
                  .addClass('blurrd-active');

              }

              resolve();

            });

          }

        });

      }));

    });

    P.all(promises).then(function() {

      if(options.cssPath) {
        $('head').prepend('<link rel="stylesheet" type="text/css" href="' + options.cssPath + '"/>');
      } else {
        var css = fs.readFileSync('./src/client.css', 'utf8');
        $('head').prepend('<style id="blurrd-client-style">' + css + '</style>');
      }

      if(options.jsPath) {
        $('body').append('<script id="blurrd-client-script" src="' + options.jsPath + '"/>');
      } else {
        var js = fs.readFileSync('./src/client.js', 'utf8');
        $('body').append('<script id="blurrd-client-script">' + js + '</script>');
      }

      resolve($.html());

    });

  });

}
