const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1 , name: 1 })

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(blog){
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!token || !decodedToken.id){
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!token || !decodedToken.id){
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if(!blog) return response.status(404).end()

  const correctUser = blog.user.toString() === decodedToken.id.toString()

  if(!correctUser){
    return response.status(400).status('Invalid user')
  }
  await Blog.findByIdAndRemove(request.params.id)
  const user = await User.findById(decodedToken.id)
  user.blogs = user.blogs.filter(blog => blog.toString() !== request.params.id)
  await user.save()
  return response.status(204).end()

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