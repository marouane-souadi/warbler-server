const mongoose = require('mongoose')
mongoose.set('debug', true)
mongoose.Promise = Promise
mongoose.connect('mongodb://localhost/warbler', {
  useNewUrlParser : true,
  keepAlive : true
},(err)=>{
    if (err) {
      console.log('error on DB connection')
    } else {
      console.log('success on DB connection')
    }
  })

module.exports.User = require('./user')
module.exports.Message = require('./message')