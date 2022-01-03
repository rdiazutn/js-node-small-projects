
const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

router.get('/', async (req, res, next) => {
  try{
    const posts = await Post.find()
    res.send(posts)
  } catch(err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try{
    const post = await Post.findById(req.params.id)
    res.send(post)
  } catch(err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try{
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedPost) {
      res.status(404).send('Post not found')
      return
    }
    res.send(updatedPost)
  } catch(err) {
    next(err)
  }
})


router.delete('/:id', async (req, res, next) => {
  try{
    const post = await Post.findByIdAndDelete(req.params.id)
    if (!post) {
      res.status(404).send('Post not found')
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
    const post = new Post({
      title: reqBody.title,
      description: reqBody.description,
      date: reqBody.date
    })
    const newPost = await post.save()
    res.send(newPost)
  } catch (err) {
    next(err)
  }
})

module.exports = router