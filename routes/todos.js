const express = require('express')
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todos')

const Todo = require('../models/Todo')
const advancedResults = require('../middleware/advancedResults')

const router = express.Router()

const { protect } = require('../middleware/auth')

router.use(protect)

router
  .route('/')
  .get(advancedResults(Todo, undefined), getTodos)
  .post(createTodo)

router.route('/:id').get(getTodo).put(updateTodo).delete(deleteTodo)

module.exports = router
