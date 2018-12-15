const db = require('../models/mongodb')
const jwt = require('jsonwebtoken')

exports.signin = async (req, res, next)=>{
  try {
    const user = await db.User.findOne({email : req.body.email})
    const {id, username, profileImageUrl} = user
    const isMatch = await user.comparePassword(req.body.password)
    if (isMatch) {
      const token = jwt.sign({
        id, 
        username, 
        profileImageUrl
      }, process.env.SECRET_KEY)
      res.status(200).json({
        id,
        username,
        profileImageUrl,
        token
      })
    } else {
      return next({
        status : 400,
        message : 'Invalid Email/Password'
      })
    }
  } catch(err) {
    return next({
      status : 400,
      message : 'Invalid Email/Password error'
    })
  }
}

exports.signup = async (req, res, next)=>{
  try {
    const user = await db.User.create(req.body)
    const {id, profileImageUrl, username} = user
    const token = await jwt.sign({
      id, 
      username, 
      profileImageUrl
    }, process.env.SECRET_KEY)
    res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    })
  } catch(err) {
    if (err.code ===11000) {
      err.message = 'Sorry that username and/or password is already taken'
    }
    return next({
      status : 400,
      message : err.message
    })
  }
}

module.exports = exports