"use script";
require("dotenv-safe").config();
global.Promise = require("bluebird");

const express = require("express");

const logger = require("./utils").logger("server");
const config = require("./config");

let server = (module.exports = express());
let database = (server.db = require("mongoose"));

server = config.server(server);
database = config.database(database);

server.get("/", (request, response) => {
  response.end("Hello World");
});

server.get("/ping", (request, response, next) => {
  return response.status(200).json({
    status: "PONG"
  });
});

server.use((request, response) => {
  return response.status(404).json({
    success: false,
    statusCode: 404,
    payload: {
      status: {
        code: "invalid.route"
      }
    }
  });
});

if (!module.parent) {
  const PORT = server.get("PORT");
  server.listen(PORT, () => {
    logger.info(`Server listening on port: ${PORT}`);
  });
}
