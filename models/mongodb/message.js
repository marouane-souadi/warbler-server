const mongoose = require('mongoose')
const User = require('./user')

const messageSchema = new mongoose.Schema({
  text : String,
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user'
  }
}, {
  timestamps : true
})

messageSchema.pre('remove', { query: true, document : true }, async function(next) {
  try {
    console.log('deletion of----------------------------------------------------- ', this)
    const user = await User.findById(this.user)
    user.messages.remove(this.id)
    await user.save()
    return next()
  } catch(err) {
    return next(err)
  }
  
})

module.exports = mongoose.model('message', messageSchema,'message')