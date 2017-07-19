let router = require("./router.js");

router.handle("/", (req, res) => {
  res.end("Hello GET!");
});
module.exports = router