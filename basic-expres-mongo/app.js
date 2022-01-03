require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

// Middlewares
app.use(bodyParser.json())
app.use(cors())

// Routes
app.get('/', (req, res) => {
  res.send('Is working')
})


// Importing routes
const postRoute = require('./routes/post')
app.use('/post', postRoute)

// Connect to MongoDB
const mongoConnection = process.env.MONGO_CONNECTION
const mongoose = require('mongoose')
if (!mongoConnection) {
  console.error('MONGO_CONNECTION not set')
  process.exit(1)
}

mongoose.connect(mongoConnection, { useNewUrlParser: true }, (err) => {
  console.error(err || 'Connected to DB!')
})


// Middlewares for responses
app.use((err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).send({ message: err.message })
  } else {
    console.log(err)
    res.status(500).send('INTERNAL SERVER ERROR!')
  }
})

// Listen
app.listen(3030)