const router = require("express").Router();
const axios = require("axios");
const { json } = require("express");

//GET /api/posts
router.get("/", async (req, res, next) => {
  let requestOptions = {
    headers: { accept: "application/json" },
  };

  //taq query
  const tag = req.query.tag;
  //   if (!tag) {
  //     return res.json("no ");
  //   }
  axios
    .get(
      `https://api.hatchways.io/assessment/blog/posts?tag=${tag}`,
      requestOptions
    )
    .then((resolve) => {
      if (tag) {
        res.status(200).json(resolve.data);
      } else {
        res.status(400).json({ error: "Tags parameter is required" });
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
