const mongoose = require('mongoose')

const CatPictureSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    maxlength: [50, 'Title cannot be more than 50 characters'],
  },
  originalBase64: {
    type: String,
    required: [true, 'Please add a base 64 encoded image'],
  },
  haarBase64: {
    type: String,
    default: '',
  },
  numberOfCats: {
    type: Number,
  },

  // user: {
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'User',
  //     required: true,
  // }
})

CatPictureSchema.set('timestamps', true)

CatPictureSchema.pre('save', async function (next) {
  console.log(this.originalBase64)
  next()
})

module.exports = mongoose.model('CatPicture', CatPictureSchema)
