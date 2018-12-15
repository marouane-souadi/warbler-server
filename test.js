const bcrypt = require('bcryptjs')
let hash1
bcrypt.hash('pass', 10).then(hash=>{
  console.log(hash)
})

bcrypt.genSalt(10).then(salt=>{
  bcrypt.hash('pass', 10).then(hash=>console.log(hash))
  bcrypt.hash('pass', salt).then(hash=>{
    console.log(salt)
    console.log(hash)
  })
})
