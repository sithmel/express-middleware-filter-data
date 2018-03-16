const Sieve = require('obj-sieve')

module.exports = function getFilter (queryParam, onError) {
  onError = onError || function (e) { console.log('Filter error: ', e.message) }
  return function (req, res, next) {
    const jsonFunc = res.json
    res.locals.sieve = new Sieve()

    res.json = function (obj) {
      req.query[queryParam] && res.locals.sieve.include(req.query[queryParam])
      try {
        const newObj = res.locals.sieve.apply(obj)
        jsonFunc.bind(res)(newObj)
      } catch (e) {
        onError(e)
        res.locals.sieve._paths.include = []
        const newObj = res.locals.sieve.apply(obj)
        jsonFunc.bind(res)(newObj)
      }
    }
    next()
  }
}
