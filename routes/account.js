const express = require('express')

const router = express.Router()

const User = require('../model/User')
const isAuthenticated = require('../middlewares/isAuthenticated')


// signup (create user)
router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body

    // if (await User.create({ username, password })) {
    //   res.send('user created')
    // } else {
    //   console.log(err)
    //   next(err)
    // }
    // res.send('user sign up has problems') 

  try {
    await User.create({ username, password })
    res.send('user created')
  } catch (err) {
    res.send('user sign up has problems') 
  }
})

//login
router.post('/login', async (req, res) => {
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
    res.send('user creation has problems') // preferred
    // throw new Error('user creation has problems')
  }
})

//logout
router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = null
  req.session.password = null
  res.send('user is logged out')
})

//update user
// router.post('/update', async (req, res) => {
//   const { username, password } = req.body

//   try {
//     await User.updateOne({ username }, { password })
//     res.send('user password updated')
//   } catch (err) {
//     console.log(err)
//     res.send('user password update occurs problems')
//     // throw new Error('user password update occurs problems')
//   }
// })
// //delete user
// router.post('/delete', async (req, res) => {
//   const { username, password } = req.body

//   try {
//     await User.deleteOne({ username, password })
//     res.send('user is deleted')
//   } catch (err) {
//     console.log(err)
//     res.send('user deletion occurs problems')
//   }
// })


module.exports = router
