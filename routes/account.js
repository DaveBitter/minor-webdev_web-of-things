const express = require('express')
const router = express.Router()
const passwordHash = require('password-hash')

router.get('/', function(req, res) {
  res.render('account/index')
});

router.get('/login', function(req, res) {
  res.render('account/login')
});

router.get('/register', function(req, res) {
  res.render('account/register')
});

router.post('/register', function(req, res) {
  const userCollection = db.collection('users')
  const registerName = req.body.username
  const registerPassword = passwordHash.generate(req.body.password)
  const registerData = {
    username: registerName,
    password: registerPassword
  }
  userCollection.findOne({username: registerName}, function(err, user) {
    if (user) {
      console.log('Username bestaat al')
      res.locals.message = "De gekozen gebruikersnaam bestaat al";
      res.render('account/register')
    } else {
      userCollection.save(registerData, (error, result) => {
        if (err) return console.log(err)
        res.redirect('/account/login')
      })
    }
  })
})

module.exports = router
