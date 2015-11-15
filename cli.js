'use strict';

var fs = require('fs'),
  blurrd = require('./blurrd');

var inputFile = process.argv[process.argv.length - 1];

fs.readFile(inputFile, 'utf8', function(err, data) {

  if(err) {
    console.log(err);
  }

  blurrd(data, {
    selector: 'article img',
    jsPath: '../src/client.js'
  }).then(function(result) {
    fs.writeFile(inputFile.replace('.html', '-blurrd.html'), result);
  });

})
