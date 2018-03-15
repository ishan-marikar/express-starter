"use strict";
module.exports = mongoose => {
  const logger = require("../../utils").logger("database");
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGODB_URI);

  mongoose.connection.on("connected", () => {
    logger.info("Connected to database");
  });

  // If the connection throws an error
  mongoose.connection.on("error", error => {
    logger.error(error);
  });

  // When the connection is disconnected
  mongoose.connection.on("disconnected", () => {
    logger.info("Disconnected from Database");
  });

  process.on("SIGINT", function() {
    mongoose.connection.close(() => {
      console.log("Connection disconnected through app termination");
      process.exit(0);
    });
  });
};
