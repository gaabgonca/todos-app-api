const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const path = require('path')
const CatPicture = require('../models/CatPicture')

// @desc To create new catpicture
// @route POST /api/v1/catpictures/
// @access public
module.exports.getCatPictures = asyncHandler(
  async (req, res, next) => {
    const catPictures = await CatPicture.find()
    res.status(201).json({
      success: true,
      data: catPictures,
    })
  }
)

// @desc To create new catpicture
// @route POST /api/v1/catpictures/
// @access private
module.exports.createCatPicture = asyncHandler(
  async (req, res, next) => {
    const catPicture = await CatPicture.create(req.body)

    res.status(201).json({
      success: true,
      data: catPicture,
    })
  }
)
