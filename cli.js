#! /usr/bin/env node

(function() {

  /*eslint no-console: [0]*/
  /*eslint strict: [2, "function"]*/
  /*eslint no-unused-vars: [0]*/

  'use strict';

  var fs = require('fs'),
    pkg = require('./package.json'),
    path = require('path'),
    mkdirp = require('mkdirp'),
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
    throw err.stack.red;
  }

  blurrd(html, {
    selector: program.selector,
    quality: program.quality,
    max: program.max
  }).then(function(result) {
    if(program.out) {
      mkdirp.sync(path.dirname(program.out));
      try {
        fs.writeFileSync(program.out, result, 'utf8');
      } catch(err) {
        throw err.stack.red;
      }
      console.log('Done!'.green);
    } else {
      console.log(result);
    }
  });

})();
