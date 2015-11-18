'use strict';

var fs = require('fs'),
  path = require('path'),
  blurrd = require('./blurrd');

var options = {
  max: 48,
  selector: 'img.singleimg',
  jsPath: '../src/client.js',
  cssPath: '../src/client.css'
}

var inputFile = path.join(__dirname, 'examples', 'furbish.html');

fs.readFile(inputFile, 'utf8', function(err, data) {

  if(err) {
    console.log(err);
  }

  blurrd(data, options).then(function(result) {
    fs.writeFile(inputFile.replace('examples', 'build'), result);
  });

})
