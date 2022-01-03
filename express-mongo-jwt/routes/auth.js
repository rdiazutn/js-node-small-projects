const router = require('express').Router()
const User = require('../models/User')

// Login
router.post('/login', async (req, res, next) => {
  try {
    const reqBody = req.body
    const user = await User.findOne({ email: reqBody.email })
    if (!user) {
      return res.status(400).send('Invalid credentials')
    }
    const isPasswordMatch = await user.comparePassword(reqBody.password)
    if (!isPasswordMatch) {
      return res.status(400).send('Invalid credentials')
    }
    const token = await user.generateToken()
    res.header('x-auth-token', token).send({
      user: user
    })
  } catch (err) {
    next(err)
  }
})


// Register
router.post('/register', async (req, res, next) => {
  try {
    const reqBody = req.body
    const user = new User({
      email: reqBody.email,
      password: reqBody.password,
      todos: []
    })
    const newUser = await user.save()
    res.send(newUser)
  } catch (err) {
    next(err)
  }
})

module.exports = router