var test = require('tape');
var sp = require('./');
var fs = require('fs');
var buf = fs.readFileSync('./readme.md');
var PassThrough = require('stream').PassThrough;

test("works", function (t) {
  var out = new Buffer('');
  var stream = new PassThrough();
  stream.on('data', function (d) {
    out = Buffer.concat([out, d]);
  });
  var outpath = sp.writableFile(stream);
  var inpath = sp.readableFile(buf);
  fs.readFile(inpath, function (err, data) {
    t.notOk(err, 'no err');
    fs.appendFile(outpath, data, function (err) {
      t.notOk(err, 'no err');
      t.equals(buf.toString('utf8'), out.toString('utf8'), 'correct stuff');
      t.end();
    });
  });
});