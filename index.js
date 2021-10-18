require("dotenv").config();

const server = require("./api/server");
const redis = require("redis");

//PORT 5000
const PORT = process.env.PORT || 8000;
// const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient({
  port: 6379,
  host: "127.0.0.1",
});

client.on("connect", () => {
  console.log("client connected to redis...");
});

client.on("error", (err) => {
  console.log(err.message);
});

server.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`);
});

module.exports = client;
