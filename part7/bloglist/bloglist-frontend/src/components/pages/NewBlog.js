import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../../hooks/index'
import { createBlog } from '../../reducers/blogReducer'
import { createNotification } from '../../reducers/notificationReducer'
import { useHistory } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'

import './NewBlog.css'

const BlogForm = () => {

  const author = useField('text')
  const title = useField('text')
  const url = useField('text')

  const dispatch = useDispatch()
  const history = useHistory()

  const addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      author: author.value,
      title: title.value,
      url: url.value,
    }

    dispatch(createBlog(blog)) 
    dispatch(createNotification(`Blog created`, 2))
    history.push('/')
  } 

  return (
    <Container>
      <Form className="formStyle" onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control placeholder="Author" {...author} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control placeholder="Title" {...title} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Url</Form.Label>
          <Form.Control placeholder="Url" {...url} />
        </Form.Group>
        <Button variant="primary" id='blog-button' type="submit">Create</Button>
      </Form>
    </Container>
  )
}

export default BlogForm