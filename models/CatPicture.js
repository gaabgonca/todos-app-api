const mongoose = require('mongoose')

const CatPictureSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    maxlength: [50, 'Title cannot be more than 50 characters'],
  },
  photo: {
    type: String,
    default: 'no-photo.jpg',
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
