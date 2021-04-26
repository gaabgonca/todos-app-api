const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')

//Load environment variables
dotenv.config({ path: './config/config.env' })

//Load models
const Todo = require('./models/Todo')
const User = require('./models/User')

//Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})

//Read JSON Files
const todos = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/todos.json`, 'utf-8')
)

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
)

//Import into DB
const importData = async () => {
  try {
    await Todo.create(todos)
    await User.create(users)
    console.log('Data imported...'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(error)
  }
}

// Delete data
const deleteData = async () => {
  try {
    await Todo.deleteMany()
    await User.deleteMany()
    console.log('Data destroyed...'.red.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
