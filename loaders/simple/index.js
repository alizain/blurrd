el.attr('data-blurrd-src', curr);

el.prepend('<img src="' + src + '" data-blurrd-loader id="' + curr + '" style="display: none"/>');

el.addClass('blurrd-img')
  .addClass('blurrd-transition')
  .addClass('blurrd-active');


  function id(len) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(var i=0; i < len; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }


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
