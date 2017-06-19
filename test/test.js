var expect = require('chai').expect;
var File = require('vinyl');
var fs = require('fs');

var loop = require('../');
var inliner = require('../inliner.js');

var fakeFile = new File({
  path: 'test/fixtures/index.html',
  contents: fs.readFileSync('test/fixtures/index.html')
});

describe('Gulp-Small-Inliner', function(){

  describe('in buffer mode', function(){


    it('should not be an empty file', function(done) {
      loop('test/fixtures', inliner)
      .on('error', done)
      .once('data', function(file) {
        expect(file).to.not.equal(null);
        done();
      })
      .end(fakeFile);
    });
    //
    // it('should be a buffer', function(done) {
    //   loop('test/fixtures', inliner)
    //   .on('error', done)
    //   .once('data', function(file) {
    //     expect(file.isBuffer()).to.be.true;
    //     done();
    //   })
    //   .end(fakeFile);
    // });
    //
    // it('should not be a stream', function(done) {
    //   loop('test/fixtures', inliner)
    //   .on('error', done)
    //   .once('data', function(file) {
    //     expect(file.isStream()).to.be.false;
    //     done();
    //   })
    //   .end(fakeFile);
    // });
    //
    // it('should not have a src="pepers.png"', function(done) {
    //   loop('test/fixtures', inliner)
    //   .on('error', done)
    //   .once('data', function(file) {
    //     expect(file.contents.toString('utf8')).not.to.contain('<img src="peppers.png">');
    //     done();
    //   })
    //   .end(fakeFile);
    // });
    //
    // it('should have a src="data:', function(done) {
    //   loop('test/fixtures', inliner)
    //   .on('error', done)
    //   .once('data', function(file) {
    //     expect(file.contents.toString('utf8')).to.contain('src="data:');
    //     done();
    //   })
    //   .end(fakeFile);
    // });




  });
});
