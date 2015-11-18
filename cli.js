'use strict';

var fs = require('fs'),
  blurrd = require('./blurrd');

var options = {
  max: 48,
  selector: '#content img',
  jsPath: '../src/client.js',
  cssPath: '../src/client.css'
}

var inputFile = process.argv[process.argv.length - 1];

fs.readFile(inputFile, 'utf8', function(err, data) {

  if(err) {
    console.log(err);
  }

  blurrd(data, options).then(function(result) {
    fs.writeFile(inputFile.replace('.html', '-blurrd.html'), result);
  });

})
