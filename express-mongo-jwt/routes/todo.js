
const router = require('express').Router()
const Todo = require('../models/Todo')

router.get('/', async (req, res, next) => {
  console.log(req.user)
  try{
    const todos = await Todo.find()
    res.send(todos)
  } catch(err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try{
    const todo = await Todo.findById(req.params.id)
    res.send(todo)
  } catch(err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try{
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedTodo) {
      res.status(404).send('Todo not found')
      return
    }
    res.send(updatedTodo)
  } catch(err) {
    next(err)
  }
})


router.delete('/:id', async (req, res, next) => {
  try{
    const post = await Todo.findByIdAndDelete(req.params.id)
    if (!post) {
      res.status(404).send('Todo not found')
      return
    }
    res.send(post)
  } catch(err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const reqBody = req.body
    const todo = new Todo({
      order: reqBody.order,
      description: reqBody.description,
      date: reqBody.date
    })
    const newTodo = await todo.save()
    res.send(newTodo)
  } catch (err) {
    next(err)
  }
})

module.exports = router