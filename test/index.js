'use strict';

var fs = require('fs'),
  path = require('path'),
  blurrd = require('../blurrd');

var inputFile = path.join(__dirname, '..', 'examples', 'basic.html');

fs.readFile(inputFile, 'utf8', function(err, data) {

  if(err) {
    console.log(err);
  }

  blurrd(data).then(function(result) {
    fs.writeFile(inputFile.replace('examples', 'build'), result);
  }, function(err) {
    console.log(err.stack);
  });

});
