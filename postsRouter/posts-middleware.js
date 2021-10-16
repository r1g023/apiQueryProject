module.exports = {
  checkTag,
};

//validate tag on get post request
function checkTag() {
  return (req, res, next) => {
    //taq query
    const tags = req.query.tags;
    if (!tags) {
      return res.status(400).json({ error: "Tags paraddmeter is required" });
    }
    next();
  };
}
