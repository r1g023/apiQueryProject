const router = require("express").Router();
const axios = require("axios");
const { checkTag } = require("./posts-middleware");

//GET /api/posts
//checkTag middleware to validate tag parameter
router.get("/", checkTag(), async (req, res, next) => {
  let requestOptions = {
    headers: { accept: "application/json" },
  };
  const tags = req.query.tags;

  console.log("tag--->", tags);
  axios
    .get(
      `https://api.hatchways.io/assessment/blog/posts?tags=${tags}`,
      requestOptions
    )
    .then((resolve) => {
      res.status(200).json(resolve.data);
    })
    .catch((err) => next(err));
});

module.exports = router;
