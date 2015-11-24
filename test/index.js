/*eslint no-console: [0]*/

'use strict';

var fs = require('fs'),
  path = require('path'),
  blurrd = require('../blurrd');

var inputFile = path.join(__dirname, '..', 'examples', 'lazyload.html');

var options = {
  transformer: 'lazyload'
};

fs.readFile(inputFile, 'utf8', function(err, data) {

  if(err) {
    console.log(err);
  }

  blurrd(data, options).then(function(result) {
    fs.writeFile(inputFile.replace('examples', 'build'), result);
  }, function(err) {
    console.log(err.stack);
  });

});
