const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const globals = {}

beforeEach(async () => {

  const savedUsers = await helper.usersInDb()

  const userForTest = {
    username: savedUsers[0].username,
    id: savedUsers[0].id,
  }

  const token = jwt.sign(userForTest, process.env.SECRET)

  globals.token = `bearer ${token}`
  globals.tokenId = userForTest.id
})


describe ('getting blogs', () => {
  test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('total blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
  })

  test('blogs contain id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('testing blogs validations', () => {
  test('valid blog added', async () => {
    const newBlog = new Blog(helper.validBlog)
    await api
      .post('/api/blogs')
      .set('Authorization', globals.token)
      .set('Content-Type', 'application/json')
      .send(newBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('valid title')
  })

  test('blog without likes', async () => {
    const newBlog = new Blog(helper.blogWithoutLikes)

    const response = await api
      .post('/api/blogs')
      .set('Authorization', globals.token)
      .set('Content-Type', 'application/json')
      .send(newBlog)
      .expect('Content-Type', /application\/json/)
      .expect(200)

    expect(response.body.likes).toBe(0)
  })

  test('blog without user and author', async () => {
    const newBlog = new Blog(helper.invalidBlog)

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', globals.token)
      .set('Content-Type', 'application/json')
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('blog deleted', async () => {

    const newBlog = await helper.validBlog

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', globals.token)
      .set('Content-Type', 'application/json')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogToDelete = response.body

    console.log('BLOG TO DELETE', blogToDelete.id)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', globals.token)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    const blogsId = blogsAtEnd.map(b => b.id)
    expect(blogsId).not.toContain(blogToDelete.id)
  })

  test('blog edited', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToEdit = blogsAtStart[0]
    const edit = { ...blogToEdit, likes: 11 }

    await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .set('Authorization', globals.token)
      .send(edit)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const blogEdited = blogsAtEnd.filter(b => b.id === blogToEdit.id)[0]
    expect(blogEdited.likes).toBe(edit.likes)

  })
})

afterAll(() => {
  mongoose.connection.close()
})

