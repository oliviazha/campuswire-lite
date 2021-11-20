const express = require('express')

const router = express.Router()

const User = require('../model/User')
const isAuthenticated = require('../middlewares/isAuthenticated')

// check if logged in
router.post('/isloggedin', isAuthenticated, (req, res) => {
  try {
    res.send(req.session.username)
  } catch (err) {
    res.send('not logged in')
  }
})

// signup (create user)
router.post('/signup', async (req, res) => {
  const { username, password } = req.body

  try {
    await User.create({ username, password })
    res.send('user created')
  } catch (err) {
    res.send('user sign up has problems')
  }
})

// login
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (!user) {
      res.send('user does not exist')
    } else {
      const { password: passDB } = user // const passDB = user.password
      if (password === passDB) {
        req.session.username = username
        req.session.password = password
        res.send('user logged in successfully')
      } else {
        res.send('user credentials are wrong')
      }
    }
  } catch (err) {
    res.send('user creation has problems')
  }

  // User.findOne({ username }, (err, result) => {
  //   if (err) {
  //     next(err)
  //   } else if (!result) {
  //     next(new Error('Not an existing user'))
  //   } else {
  //     req.session.user = username
  //     req.session.password = password
  //     next()
  //   }
  // })
})

// logout
router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = null
  req.session.password = null
  res.send('user is logged out')
})

module.exports = router
