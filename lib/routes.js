// routes.js

var router = require('./lib/router');


// Use the router to register callbacks
// for paths and HTTP verbs
router.get('/', (req, res) => {
  res.end('Hello GET!');
});

// router.post('/', (req, res) => {
//   res.end('Hello POST!');
// });


module.exports = router.routes;
