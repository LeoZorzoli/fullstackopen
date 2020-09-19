const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)


describe ('getting blogs', () => {
  test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are one blog', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(1)
  })

  test('blogs contain id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('creating blogs', () => {
  test('blog added', async () => {

  })
})


afterAll(() => {
  mongoose.connection.close()
})

