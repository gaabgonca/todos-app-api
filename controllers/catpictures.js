const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const path = require('path')
const CatPicture = require('../models/CatPicture')

// @desc To create new catpicture
// @route POST /api/v1/catpictures/
// @access public
module.exports.getCatPictures = asyncHandler(
  async (req, res, next) => {
    res.status(200).json(res.advancedResults)
  }
)

// @desc To fetch catpicture by Id
// @route GET /api/v1/catpictures/:id
// @access public
module.exports.getCatPicture = asyncHandler(
  async (req, res, next) => {
    const catPicture = await CatPicture.findById(req.params.id)

    if (!catPicture) {
      return next(
        new ErrorResponse(
          `CatPicture not found with id ${req.params.id}`,
          404
        )
      )
    }

    res.status(200).json({
      success: true,
      data: catPicture,
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

// @desc To edit catpicture by Id
// @route PUT /api/v1/catpictures/:id
// @access private
module.exports.updateCatPicture = asyncHandler(
  async (req, res, next) => {
    let catPicture = await CatPicture.findById(req.params.id)

    if (!catPicture) {
      return next(
        new ErrorResponse(
          `CatPicture not found with id ${req.params.id}`,
          404
        )
      )
    }

    catPicture = await CatPicture.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    res.status(200).json({
      success: true,
      data: catPicture,
    })
  }
)

// @desc To delete catpicture by Id
// @route DELETE /api/v1/catpictures/:id
// @access private
module.exports.deleteCatPicture = asyncHandler(
  async (req, res, next) => {
    const catPicture = await CatPicture.findById(req.params.id)

    if (!catPicture) {
      return next(
        new ErrorResponse(
          `CatPicture not found with id ${req.params.id}`,
          404
        )
      )
    }

    await catPicture.remove()

    res.status(200).json({
      success: true,
      data: {},
    })
  }
)
