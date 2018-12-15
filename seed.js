const db = require('./models/mongodb')
const fetch = require('node-fetch')
const faker = require('faker')

const userCount = 10

const addMessages = async (user, count)=>{
  if (count > 0) {
    const newMessage = {
      text : faker.lorem.paragraph(2),
      user : user.id
    }
    const message = await db.Message.create(newMessage)
    user.messages.push(message.id)  
    return addMessages(user, count-1)
  }
}
const createFakeUser = (count)=>{
  if (count > 0) {
    fetch('https://randomuser.me/api/').then(res=>res.json())
      .then(d=>{
        const data = d.results[0]
        console.log(data.gender, count)
        if (data.gender==='male') {
          db.User.create({
            username : data.login.username,
            email : data.email,
            password : 'password',
            profileImageUrl : data.picture.large
          }).then(user=>{
            await addMessages(user, 4)
            await user.save()
          })
          .catch((err)=>{
            console.log(err)
          })
        return createFakeUser(count-1)
        }
        else return createFakeUser(count)
      }).catch(err=>{
        console.log(err)
        return createFakeUser(count)
      })
  }
  else return
}
db.User.deleteMany({}, (err)=>{
  if (err) console.log(err)
  else {
    console.log('user deletion complete')
    db.Message.deleteMany({}, err=>{
      if (err) console.log(err)
      else {
      console.log('message deletion complete')
      createFakeUser(userCount)
      }
    })
  }
})



