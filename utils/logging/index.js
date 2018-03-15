const winston = require("winston");

module.exports = name => {
  let logger = new winston.Logger();
  if ((process.env.NODE_ENV = "test")) {
    logger.add(winston.transports.File, {
      filename: "logger.log"
    });
  } else {
    logger.add(winston.transports.Console, {
      colorize: true,
      prettyPrint: true,
      timestamp: true,
      label: name
    });
  }
  return logger;
};
