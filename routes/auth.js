const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../model/user');
const passport = require('passport');

router.post('/register', async (req, res) => {
  const { username, password, name, phone, email, citizenID } = req.body
  
  // simple validation
  if (!name || !username || !password || !phone || !email || !citizenID) {
    return res.render('register', { message: 'Please try again' })
  }
  
  const passwordHash = bcrypt.hashSync(password, 10)
  const user = new User({
    name,
    username,
    password: passwordHash,
    phone,
    email,
    citizenID
  })

  await user.save()
  res.render('index', { user })
})

router.post('/login', passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}), async (req, res) => {
    const { username, password } = req.body;
    res.redirect('/');
})

router.post('/user_info', async (req, res) => {
    const { username, password, name, phone, email, citizenID } = req.body;
    
    // simple validation
    if (!name || !username || !password || !phone || !email || !citizenID) {
      return res.render('user_in', { message: 'Please try again' });
    };
    
    const passwordHash = bcrypt.hashSync(password, 10)
    const user = new User({
      name,
      username,
      password: passwordHash,
      phone,
      email,
      citizenID
    });
  
    await user.findOneAndUpdate({username: username}, { $set:{name: name},$set:{password: passwordHash}
        ,$set:{phone: phone},$set:{email: email},$set:{citizenID: citizenID} }, {new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
    res.render('index', { user })
    });
})

module.exports = router;