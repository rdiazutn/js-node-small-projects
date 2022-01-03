const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        return val.length > 10 && val.length < 100
      }
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Post', PostSchema)