const Blog = require('../models/blog')
const User = require('../models/user')

const testUser = {
  name: 'example User',
  username: 'example',
  password: 'example',
}

const initialBlogs = [
  {
    title: 'title example 1',
    author: 'author example 1',
    url: 'example1.com',
    likes: 1,
  },
  {
    title: 'title example 2',
    author: 'author example 2',
    url: 'example2.com',
    likes: 2,
  }
]

const validBlog = {
  title: 'valid title',
  author: 'valid author',
  url: 'validurl.com',
  likes: 10,
}

const blogWithoutLikes = {
  title: 'without likes',
  author: 'leo',
  url: 'likes.com',
}

const invalidBlog = {
  url: 'invalidurl.com',
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  validBlog,
  blogWithoutLikes,
  invalidBlog,
  usersInDb,
  testUser
}