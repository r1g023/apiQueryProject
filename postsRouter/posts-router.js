const router = require("express").Router();
const axios = require("axios");
const { checkTag } = require("./posts-middleware");
const redis = require("redis");

const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

//GET /api/posts
//checkTag middleware to validate tag parameter
router.get("/", checkTag(), async (req, res, next) => {
  let requestOptions = {
    headers: { accept: "application/json" },
  };
  const tag = req.query.tag;

  console.log("tag--->", tag);
  axios
    .get(
      `https://api.hatchways.io/assessment/blog/posts?tag=${tag}`,
      requestOptions
    )
    .then((resolve) => {
      const data = resole.data.author;
      client.setex("posts", 3600);
      res.status(200).json(resolve.data);
    })
    .catch((err) => next(err));
});

module.exports = router;
