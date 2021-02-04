const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  
  username: {
    type: String,
    unique: true
  },
  password: String,
  name: String,
  phone: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  citizenID: {
    type: String,
    unique: true
  },
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel