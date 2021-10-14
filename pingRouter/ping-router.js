const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ success: true });
});

module.exports = router;
