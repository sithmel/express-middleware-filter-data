/* eslint-env node, mocha */
var assert = require('chai').assert
var middleware = require('..')
var sinon = require('sinon')

describe('middleware', function () {
  it('is a function', function () {
    assert.typeOf(middleware, 'function')
  })

  it('is inactive when unused', function () {
    const req = { query: {} }
    const jsonFunc = sinon.spy()
    const res = { json: jsonFunc, locals: {} }
    middleware('filter')(req, res, function () {
      assert.isDefined(res.locals.sieve)
      res.json({ hello: 1, world: 2 })
    })
    assert(jsonFunc.calledOnce)
    assert(jsonFunc.calledWith({ hello: 1, world: 2 }))
  })

  it('filters the output', function () {
    const req = { query: { filter: 'hello' } }
    const jsonFunc = sinon.spy()
    const res = { json: jsonFunc, locals: {} }
    middleware('filter')(req, res, function () {
      assert.isDefined(res.locals.sieve)
      res.json({ hello: 1, world: 2 })
    })
    assert(jsonFunc.calledOnce)
    assert(jsonFunc.calledWith({ hello: 1 }))
  })

  it('calls on error', function () {
    const req = { query: { filter: 'hel[lo' } }
    const jsonFunc = sinon.spy()
    const onError = sinon.spy()
    const res = { json: jsonFunc, locals: {} }
    middleware('filter', onError)(req, res, function () {
      assert.isDefined(res.locals.sieve)
      res.json({ hello: 1, world: 2 })
    })
    assert(onError.calledOnce)
    assert(jsonFunc.calledOnce)
    assert(jsonFunc.calledWith({ hello: 1, world: 2 }))
  })
})
