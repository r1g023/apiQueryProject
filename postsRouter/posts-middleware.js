module.exports = {
  checkTag,
};

//validate tag on get post request
function checkTag() {
  return (req, res, next) => {
    //taq query
    const tag = req.query.tag;
    if (!tag) {
      return res.status(400).json({ error: "Tags parameter is required" });
    }
    next();
  };
}
