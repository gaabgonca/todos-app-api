const express = require('express')
const {
  getCatPictures,
  createCatPicture,
} = require('../controllers/catpictures')

const router = express.Router()

router.route('/').get(getCatPictures).post(createCatPicture)

module.exports = router
