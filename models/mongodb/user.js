const mongoose =  require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  username : {
    type : String,
    required : true,
    unique : true
  },
  email : {
    type : String,
    unique : true,
    required : true
  },
  profileImageUrl : String,
  password : {
    type : String,
    required : true
  },
  messages : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'message'
    }]
})

userSchema.pre('save', async function(next){
  try {
    const user = this
    if(!user.isModified('password')) return next()
    const hashedPassword = await bcrypt.hash(user.password, 10)
    user.password = hashedPassword
    return next()
  } catch(err) {
    return next(err)
  }
})

userSchema.methods.comparePassword = async function(candidatePassword, next){
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
  } catch(err) {
    return next(err)
  }
  
}

module.exports = mongoose.model('user', userSchema, 'user')