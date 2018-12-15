const express = require('express')
const router = express.Router({mergeParams : true})
const {createMessage, deleteMessage} = require('../handlers/messages')
const {ensureCorrectUser, loginRequired} = require('../middleware/auth')

router.route('/')
  .post(loginRequired, ensureCorrectUser, createMessage)
router.route('/:message_id')
  .delete(loginRequired, ensureCorrectUser, deleteMessage)
                

module.exports = router