const jwt = require('jsonwebtoken')

exports.loginRequired = (req, res, next)=>{
  try {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
      if (decoded) {
        next()
      } else {
        next({
          status : 401,
          message : "Please login first"
        })
      }
    })
  } catch(e) {
    next({
      status : 401,
      message : "Please login first"
    })
  }
}

exports.ensureCorrectUser = (req, res, next)=>{
  try {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
      if (decoded &&(decoded.id===req.params.id)) {
        console.log(decoded)
        next()
      } else {
        next({
          status : 401,
          message : "you are not authorized to do that"
        })
      }
    })
  } catch (e) {
    next({
      status : 401,
      message : "you are not authorized to do that"
    })
  }
}

module.exports = exports