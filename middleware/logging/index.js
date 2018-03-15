"use strict";
const logger = require("../../utils").logger("request");

let routeLogger = (request, response, next) => {
  logger.info({
    method: request.method,
    path: request.path,
    // url: request.originalUrl,
    useragent: request.headers["user-agent"]
  });
  return next();
};

module.exports = routeLogger;
