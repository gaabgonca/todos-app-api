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

module.exports = mongoose.model('CatPicture', CatPictureSchema)
