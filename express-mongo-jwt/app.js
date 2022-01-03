require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

// Middlewares
app.use(express.json())
app.use(cors())
app.use(require('./middlewares/Authenticate'))

// Default route
app.get('/', (req, res) => {
  res.send('Is working')
})


// Importing routes
const todoRoute = require('./routes/todo')
app.use('/api/todo', todoRoute)
const authRoute = require('./routes/auth')
app.use('/api/auth', authRoute)

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
const errorMiddleware = require('./middlewares/Error')
app.use(errorMiddleware)

// Listen
app.listen(3030, () => console.log('Listening on port 3030'))