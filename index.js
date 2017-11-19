const Sieve = require('obj-sieve');

module.exports = function getFilter(queryParam) {
  return function (req, res, next) {
    const jsonFunc = res.json;
    res.json = function (obj) {
      const newObj = req.query[queryParam] ?
        Sieve.filter(req.query[queryParam], obj) : obj;
      jsonFunc(newObj);
    };
    next();
  };
};
