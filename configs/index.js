let configs = {}

configs.nodeEnv = process.env.NODE_ENV || "dev"

let dev = {}
if (configs.nodeEnv === "dev") {
  dev = require("./configs.dev.json")
}

configs.dbUrl = process.env.DB_URL || dev.DB_URL,
configs.server = {
  port : process.env.PORT || dev.SERVER.PORT,
  host : process.env.IP || dev.SERVER.HOST
}
configs.secretKey = "secretkeyphrase"

module.exports = configs