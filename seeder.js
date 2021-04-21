const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')

//Load environment variables
dotenv.config({ path: './config/config.env' })

//Load models
const CatPicture = require('./models/CatPicture')

//Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})

//Read JSON Files
const cats = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/cats.json`, 'utf-8')
)

//Import into DB
const importData = async () => {
  try {
    await CatPicture.create(cats)
    console.log('Data imported...'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(error)
  }
}

// Delete data
const deleteData = async () => {
  try {
    await CatPicture.deleteMany()
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
