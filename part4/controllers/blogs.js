const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const savedBlog = await blog.save()
  response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blogToUpdate = request.body

  const blog = await Blog.findById(request.params.id)
  if (!blog) return response.status(404).end()

  blog.author = blogToUpdate.author
  blog.title = blogToUpdate.title
  blog.url = blogToUpdate.url
  blog.likes = blogToUpdate.likes

  const updatedBlog = await blog.save()

  return response
    .json(updatedBlog.toJSON())
    .status(200)
    .end()
})



module.exports = blogsRouter