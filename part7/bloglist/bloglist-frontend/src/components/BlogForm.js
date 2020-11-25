import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks/index'
import { createBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'

const BlogForm = () => {

  const author = useField('text')
  const title = useField('text')
  const url = useField('text')

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    const blog = {
      author: author.value,
      title: title.value,
      url: url.value,
    }

    dispatch(createBlog(blog)) 
    dispatch(createNotification(`Blog created`, 2))
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <input placeholder="Author" {...author} />
        <input placeholder="Title" {...title} />
        <input placeholder="Url" {...url} />
        <button id='blog-button' type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm