const configs = require('./configs')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./models/mongodb')
const authRoutes = require('./routes/auth')
const messageRoutes = require('./routes/message')
const errorHandler = require('./handlers/error')
const {loginRequired} = require("./middleware/auth")
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.get('/', (req, res)=>{
  res.json({message : 'Make a post request to /api/auth/signup to signup'})
})


app.use('/api/auth', authRoutes)

app.use('/api/users/:id/messages', messageRoutes)

app.get('/api/messages', loginRequired,(req, res)=>{
  db.Message.find().sort({createdAt : 'desc'})
    .populate('user', {username : true, profileImageUrl : true})
    .then((messages)=>{
      res.json(messages)
    }).catch(err =>{
      res.status(500).json(err)
    })
})

app.use((req, res, next)=>{
  let err = new Error('Not found')
  err.status = 404
  next(err)
})

app.use(errorHandler)

app.listen(configs.server.port, ()=>{
  console.log(`Server is listening on http://localhost:${configs.server.port}`)
})