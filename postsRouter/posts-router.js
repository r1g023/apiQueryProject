const router = require("express").Router();
const axios = require("axios");
const { checkTag } = require("./posts-middleware");
const redis = require("redis");
const redisPort = 6379;
const client = redis.createClient(redisPort);

//log error to the console if any occurs
client.on("error", (err) => {
  console.log(err);
});

//GET /api/posts
//checkTag middleware to validate tag parameter
router.get("/", checkTag(), async (req, res, next) => {
  const tag = req.query.tag;
  let requestOptions = {
    headers: { accept: "application/json" },
  };

  try {
    client.get(tag, async (err, posts) => {
      if (err) throw err;

      if (posts) {
        res.status(200).json({
          posts: posts,
          message: "data retrieved from the cache",
        });
      } else {
        const userPosts = await axios.get(
          `https://api.hatchways.io/assessment/blog/posts?tag=${tag}`,
          requestOptions
        );

        client.setex(tag, 600, JSON.stringify(userPosts.data));
        res.status(200).json({ posts: userPosts.data, message: "cache miss" });
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
