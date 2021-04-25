const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const path = require('path')
const Todo = require('../models/Todo')

// @desc To get all todos
// @route GET /api/v1/todos/
// @access private
module.exports.getTodos = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

// @desc To fetch todo by Id
// @route GET /api/v1/todos/:id
// @access private
module.exports.getTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id)

  if (!todo) {
    return next(
      new ErrorResponse(
        `Todo not found with id ${req.params.id}`,
        404
      )
    )
  }

  res.status(200).json({
    success: true,
    data: todo,
  })
})

// @desc To create new todo
// @route POST /api/v1/todos/
// @access private
module.exports.createTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.create(req.body)

  res.status(201).json({
    success: true,
    data: todo,
  })
})

// @desc To edit todo by Id
// @route PUT /api/v1/todos/:id
// @access private
module.exports.updateTodo = asyncHandler(async (req, res, next) => {
  let todo = await Todo.findById(req.params.id)

  if (!todo) {
    return next(
      new ErrorResponse(
        `Todo not found with id ${req.params.id}`,
        404
      )
    )
  }

  todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: todo,
  })
})

// @desc To delete todo by Id
// @route DELETE /api/v1/todos/:id
// @access private
module.exports.deleteTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id)

  if (!todo) {
    return next(
      new ErrorResponse(
        `Todo not found with id ${req.params.id}`,
        404
      )
    )
  }

  await todo.remove()

  res.status(200).json({
    success: true,
    data: {},
  })
})
