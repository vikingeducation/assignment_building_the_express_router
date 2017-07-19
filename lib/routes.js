let router = require("./router");

router.get("/", (req, res) => {
  res.end("Hello GET!");
});
