const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  
  username: {
    type: String,
    unique: true,
    uniqueCaseInsensitive: true
  },
  
  password: String,
  
  name: String,
  
  phone: {
    type: String,
    unique: true
  },
  
  email: {
    type: String,
    index: true,
    unique: true,
    uniqueCaseInsensitive: true
  },
  
  citizenID: {
    type: String,
    unique: true
  }
})

const UserSchema = userSchema.plugin(uniqueValidator);
const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel