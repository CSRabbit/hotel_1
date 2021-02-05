var express = require('express');
var router = express.Router();

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect('/login');
  }
};

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('index', { title: 'Express' , user: req.session.user });
});

router.get('/auth/userinfo', isLoggedIn, function(req, res, next) {
  res.render('user_info', { user: req.session.user });
});

router.get('/login', (req, res) => {
  res.render('login');
}); 

router.get('/register', (req, res) => {
  res.render('register');
}); 

module.exports = router;
