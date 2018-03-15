"use strict";
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const middleware = require("../../middleware");

module.exports = server => {
  // Trust the proxy, because it's most likely the load-balancer/ELB
  server.enable("trust proxy");

  // Body Parser
  server.use(bodyParser.json());

  // Listening Port
  server.set("PORT", process.env.PORT || 8080);

  // gZip Compression
  server.use(compression());

  // CORs Headers
  server.use(cors());

  // Security;
  server.use(helmet());

  server.use(middleware.logger);

  return server;
};
