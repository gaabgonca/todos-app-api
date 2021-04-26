const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    trim: true,
  },
  note: {
    type: String,
    trim: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
})

TodoSchema.set('timestamps', true)

module.exports = mongoose.model('Todo', TodoSchema)
