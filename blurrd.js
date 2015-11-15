'use strict';

var P = require('bluebird'),
  fs = require('fs'),
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

        var src = el.attr('src');

        request({
          url: src,
          encoding: null
        }, function(err, res, body) {

          preview.generate(body, options.max || 24, function(err, data) {

            if(typeof data === 'string') {

              var curr = id(6);

              el.attr('src', data)
                .attr('data-blurrd-id', curr)
                .addClass('blurrd-img');

              $('body').prepend('<img src="' + src + '" id="' + curr + '" class="blurrd-hidden" style="display: none"/>')

              if(options.cssBlur) {
                el.addClass('blurrd-transition')
                  .addClass('blurrd-active');
              }

            }

            resolve();

          });

        });

      }));

    });

    P.all(promises).then(function() {

      if(options.cssBlur) {
        if(options.cssPath) {
          $('head').prepend('<link rel="stylesheet" type="text/css" href="' + options.cssPath + '"/>');
        } else {
          var css = fs.readFileSync('./src/client.css', 'utf8');
          $('head').prepend('<style id="blurrd-client-style">' + css + '</style>');
        }
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
