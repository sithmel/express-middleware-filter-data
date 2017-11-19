var assert = require('chai').assert;
var middleware = require('..');
var sinon = require('sinon');

describe('middleware', function () {
  it('is a function', function () {
    assert.typeOf(middleware, 'function');
  });

  it('is inactive when unused', function () {
    const req = { query: {} };
    const jsonFunc = sinon.spy();
    const res = { json: jsonFunc };
    middleware('filter')(req, res, function () {
      res.json({ hello: 1, world: 2 });
    });
    assert(jsonFunc.calledOnce);
    assert(jsonFunc.calledWith({ hello: 1, world: 2 }));
  });

  it('filters the output', function () {
    const req = { query: { filter: 'hello' } };
    const jsonFunc = sinon.spy();
    const res = { json: jsonFunc };
    middleware('filter')(req, res, function () {
      res.json({ hello: 1, world: 2 });
    });
    assert(jsonFunc.calledOnce);
    assert(jsonFunc.calledWith({ hello: 1 }));
  });
});
