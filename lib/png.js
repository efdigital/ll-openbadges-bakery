const util = require('util')
const pngitxt = require('png-itxt');
const concat = require('concat-stream');

const KEYWORD = 'openbadges';

module.exports = {
  bake: bake,
  extract: extract,
  keyword: KEYWORD
}

function bake(options, callback) {
  options = options || {};
  const bufferOrStream = options.image;

  if (!bufferOrStream)
    return callback(new Error('Must pass an `image` option'));

  var data = options.url || options.data || options.assertion || options.signature;

  if (!data)
    return callback(new Error('Must pass an `assertion` or `signature` option'));

  if (typeof data === 'object')
    data = JSON.stringify(data);
  
  // Assuming we are always overwriting old signatures etc
  try {
    concatStream = concat(function (data) { callback (null, data); });
    // is it a buffer?
    if (Buffer.isBuffer(bufferOrStream)) {
      var imgStream = pngitxt.set(KEYWORD, data);
      imgStream.pipe(concatStream);
      imgStream.end(bufferOrStream);
    }
    // or is it a stream?
    else if (typeof bufferOrStream.pipe === 'function') {
      bufferOrStream.on('error', callback);
      var imgStream = pngitxt.set(KEYWORD, data);
      imgStream.pipe(concatStream);
      bufferOrStream.pipe(imgStream);
    }
  }
  catch (err) {
    callback(err);
  }
}

function extract(img, callback) {
  try {
    var pngStream = pngitxt.get(KEYWORD, function (data) {
      if (!data) {
        callback(new Error('Image does not have any baked in data.'));
      }
      else {
        callback(null, data);
      }
    });
    
    // Check if it is a buffer or stream.
    if (Buffer.isBuffer(img)) {
      pngStream.end(img);
    }
    else {
      img.pipe(pngStream);
    }
  }
  catch (err) {
    callback(err);
  }

}

