const db = require('../models/mongodb')

exports.createMessage = async (req, res, next)=>{
  try {
    const newMessage = {
      text : req.body.text,
      user : req.params.id
    }
    const message = await db.Message.create(newMessage)
    const user = await db.User.findById(req.params.id)
    user.messages.push(message.id) 
    await user.save()
    const foundMessage = await db.Message.findById(message._id).populate('user', {username : true, profileImage : true})
    res.status(200).json(foundMessage)
  } catch(err) {
    return next(err)
  }
}
exports.deleteMessage = async (req, res, next) => {
  try {
    const message = await db.Message.findById(req.params.message_id)
    if (message) {
      message.remove()
      res.status(200).json({
        message : message.id+' deleted succesfuly'
      })
    } else {
      res.status(200).json({
        message : 'message not found'
      })
    }
  } catch(err) {
    next(err)
  }
}
exports.getMessage = async (req, res, next) => {}  
exports.getUserMessages = async (req, res, next) => {}  


module.exports = exports