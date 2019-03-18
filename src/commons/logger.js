import winston from "winston";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL,
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: process.env.LOG_FILE || "payment-gateway.log"
    })
  ]
});

export default logger;
