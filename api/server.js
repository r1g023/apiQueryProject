const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
const redis = require("redis");
const client = require("../index");

//GLOBACL MIDDLEWARE
server.use(express.json(), cors(), helmet());

//import routers
const pingRouter = require("../pingRouter/ping-router");
const postsRouter = require("../postsRouter/posts-router");

//server endpoints ---->
server.use("/api/ping", pingRouter);
server.use("/api/posts", postsRouter);

//middleware for CATCH ERROR on all endpoints of /api/messages
server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "500 error: Something went wrong",
  });
});

module.exports = server;
