// routes.js

var router = require('./router');


// Use the router to register callbacks
// for paths and HTTP verbs
router.get('/', (req, res) => {
  console.log("Inside the route");
  res.end('Hello GET!');
});

// router.post('/', (req, res) => {
//   res.end('Hello POST!');
// });


module.exports = router.routes;
