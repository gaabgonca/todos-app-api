const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const path = require('path')
const Todo = require('../models/Todo')

// @desc To get all todos
// @route GET /api/v1/todos/
// @access private
module.exports.getTodos = asyncHandler(async (req, res, next) => {
  //Check if user is admin
  if (req.user && req.user.role === 'admin') {
    return res.status(200).json(res.advancedResults)
  }

  //If user is not admin edit query
  if (req.user) {
    ;(async (req, res) => {
      await (req.query['user'] = req.user.id)
      return res.status(200).json(res.advancedResults)
    })(req, res)
  }
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
  //Add user to Todo
  req.body.user = req.user.id

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

  //Make sure user is Todo owner
  if (
    todo.user.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to edit this todo `,
        401
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

  //Make sure user is Todo owner
  if (
    todo.user.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to edit this todo `,
        401
      )
    )
  }

  await todo.remove()

  res.status(200).json({
    success: true,
    data: {},
  })
})
