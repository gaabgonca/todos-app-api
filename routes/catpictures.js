const express = require('express')
const {
  getCatPictures,
  getCatPicture,
  createCatPicture,
  updateCatPicture,
  deleteCatPicture,
} = require('../controllers/catpictures')

const CatPicture = require('../models/CatPicture')
const advancedResults = require('../middleware/advancedResults')

const router = express.Router()

router
  .route('/')
  .get(advancedResults(CatPicture, undefined), getCatPictures)
  .post(createCatPicture)

router
  .route('/:id')
  .get(getCatPicture)
  .put(updateCatPicture)
  .delete(deleteCatPicture)

module.exports = router
