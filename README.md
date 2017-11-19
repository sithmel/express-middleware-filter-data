express-middleware-filter-data
==============================
This middleware allows to filter an object returned by res.json using a query parameter. Example:
```js
const getFilterMiddleware = require('express-middleware-filter-data');
// "filter" will be the query parameter used for filtering
const filterMiddleware = getFilterMiddleware('filter');

// express middleware
app.get('/data', filterMiddleware, function(req, res){
  res.json({  ... lot of data ... , total: 123 });
});
```
The client, calling this endpoint can ask to filter the response:
```
http://localhost:3000/data?filter=total
```
and it will receive:
```js
{ total: 123 }
```

Filtering expressions
=====================
The filtering expressions are very powerful. You can use multiple coma separated expressions. Like:
```
http://localhost:3000/data?filter=user.products // filters only the content of users.products
```
```
http://localhost:3000/data?filter=users[:10]name // first ten users names
```
The full syntax is explained here: https://github.com/sithmel/obj-sieve
