const mongoose = require('mongoose')
module.exports = function (err, req, res, next) {
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).send({ message: err.message })
  } else {
    console.log(err)
    res.status(500).send({ text: 'INTERNAL SERVER ERROR!', message: err.message })
  }
}