
/*!
 * Internal dependencies.
 */

var Racks = Racks || require('..');

describe('Racks', function() {
  it('can invoke registered middlewares', function(done) {
    var racks = new Racks
      , called = [];

    racks.use(function(next) {
      called.push('1st');
      next();
    });

    racks.use(function(next) {
      called.push('2nd');
      next();
    });

    racks.use(function() {
      called.should.eql(['1st', '2nd']);
      done();
    });

    racks.send();
  });

  it('allows last middleware to call next even if there is not next middleware', function(done) {
    var racks = new Racks;

    racks.use(function(next) {
      next();
      done();
    });

    racks.send();
  });

  it('can pass arguments', function(done) {
    var racks = new Racks;

    racks.use(function(obj, next) {
      obj.first = true;
      next(obj);
    });

    racks.use(function(obj, next) {
      obj.second = true;
      next(obj);
    });

    racks.use(function(obj) {
      obj.first.should.be.true;
      obj.second.should.be.true;
      done();
    });

    racks.send({});
  });

  it('can register middleware triggered after each other middleware', function(done) {
    var racks = new Racks
      , order = [];

    racks.use(function(next) {
      order.push('1st');
      next();
    });

    racks.use(function(next) {
      order.push('2nd');
      next();
    });

    racks.use(function() {
      order.should.eql(['1st', 'after 1st', 'after 2nd', '2nd', 'after 1st', 'after 2nd']);
      done();
    });

    racks.after(function(next) {
      order.push('after 1st');
      next();
    });

    racks.after(function(next) {
      order.push('after 2nd');
      next();
    });

    racks.send();
  });
  it('should always call in the context of the rack', function (done) {
    var rack = new Racks
    rack.use(function (next) {
      this.should.equal(rack)
      next()
    })
    rack.use(function (next) {
      this.should.equal(rack)
      done()
    })
    rack.send()
  })
});
