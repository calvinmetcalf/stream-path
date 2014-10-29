var spawn = require('child_process').spawn;
var crypto = require('crypto');
var fs = require('fs');
var os = require('os');
var path = require('path');
var PassThrough = require('stream').PassThrough;
var names = [];
exports.readableFile = function (stream) {
  if (Buffer.isBuffer(stream)) {
    var temp = stream;
    stream = new PassThrough();
    stream.end(temp);
  }
  var name = path.join(os.tmpdir(), 'bloburl' + crypto.randomBytes(8).toString('hex'));
  names.push(name);
  spawn('mkfifo', [name]);
  stream.pipe(fs.createWriteStream(name));
  return name;
};
exports.writableFile = function (stream) {
  var name = path.join(os.tmpdir(), 'bloburl' + crypto.randomBytes(8).toString('hex'));
  names.push(name);
  spawn('mkfifo', [name]).on('close', function () {
    fs.createReadStream(name).pipe(stream);
  });
  return name;
};
process.on('exit', function() {
  var file;
  while (names.length) {
    file = names.pop();
    fs.unlinkSync(file);
  }
});