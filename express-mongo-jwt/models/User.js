const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SALT_WORK_FACTOR = 10


// User schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 128
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxlength: 10024
  },
  token: {
    type: String,
    default: ''
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  todos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo'
  }]
})
// Validations 

// Validate user email
UserSchema.path('email').validate((val) => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(val)
}, 'Invalid email')


// Pre
UserSchema.pre('save', function(next) {
  const user = this
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  user.updated = Date.now()
  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err)
      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err)
          // override the cleartext password with the hashed one
          user.password = hash
          next()
      })
  })
})

// Set
UserSchema.set('toJSON', {
  transform: function(doc, ret, opt) {
      delete ret['password']
      delete ret['token']
      return ret
  }
})


// Methods

// Generate token
UserSchema.methods.generateToken = function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toHexString() }, process.env.JWT_SECRET).toString()
  user.token = token
  return user.save().then(() => token)
}

// Compare password
UserSchema.methods.comparePassword = function (password) {
  const user = this
  return bcrypt.compare(password, user.password)
}

module.exports = mongoose.model('User', UserSchema)