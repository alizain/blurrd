#! /usr/bin/env node

(function() {

  /*eslint no-console: [0]*/
  /*eslint strict: [2, "function"]*/
  /*eslint no-unused-vars: [0]*/

  'use strict';

  var fs = require('fs'),
    pkg = require('./package.json'),
    colors = require('colors'),
    blurrd = require('./blurrd'),
    program = require('commander');

  program
    .version(pkg.version)
    .usage('[options] <file>')
    .option('-s, --selector [value]', 'Image selector for cheerio')
    .option('-q, --quality [value]', 'Image compression quality factor', parseInt)
    .option('-m, --max [value]', 'Maximum image dimensions', parseInt)
    .option('-o, --out [value]', 'Output file')
    .parse(process.argv);

  if(program.args.length === 0) {
    return console.log('No input file provided, exiting!'.red);
  }

  var html;
  try {
    html = fs.readFileSync(program.args[0], 'utf8');
  } catch(err) {
    if(err.code === 'ENOENT') {
      return console.log((program.args[0] + ' is not a valid path').red);
    } else {
      throw err;
    }
  }

  blurrd(html, {
    selector: program.selector,
    quality: program.quality,
    max: program.max
  }).then(function(result) {
    console.log(result);
  }, function(err) {
    console.log(err.toString().red);
  });

})();
