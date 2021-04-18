const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')

const connectDB = require('./config/db')

//Load environment variables

dotenv.config({ path: './config/config.env' })

// Connect to database
connectDB()

//Route files
const catpictures = require('./routes/catpictures')

const app = express()

// Body parser

app.use(
  express.json({
    limit: '10mb',
  })
)

// Dev logging midleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Mont Routers
app.use('/api/v1/catpictures', catpictures)

const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      .yellow.bold
  )
)

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  //Close server and exit process
  server.close(() => {
    process.exit(1)
  })
})
