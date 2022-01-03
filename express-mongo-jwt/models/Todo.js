const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  order: {
    type: Number,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  date: {
    type: Date,
    default: Date.now
  }
})
//Validate userid and order are unique
TodoSchema.index({ userId: 1, order: 1 }, { unique: true })

module.exports = mongoose.model('Todo', TodoSchema)