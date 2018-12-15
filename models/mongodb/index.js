const mongoose = require("mongoose");
const configs = require("../../configs");

mongoose.set('debug', true)
mongoose.Promise = Promise
mongoose.connect(configs.dbUrl, {
  useNewUrlParser : true,
  keepAlive : true
},(err)=>{
    if (err) {
      console.log('error on DB connection')
    } else {
      const User = require("./user")
      User.find().then(users => {
        if (users.length <1) {
          require("../../seed")()
        }
      })
      console.log('success on DB connection')
    }
  })

module.exports.User = require('./user')
module.exports.Message = require('./message')