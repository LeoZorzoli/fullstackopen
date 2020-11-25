import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleShowDetails = () => {
    setShowDetails(state => !state)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 4,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const user = useSelector(state => state.login)

  const dispatch = useDispatch()

  const removeBlog = async (id) => {
    dispatch(deleteBlog(id))
  }

  const addLike = async (blog) => {
    const { author, url, title } = blog
    const updatedBlog = {
      user: blog.user?.id || blog.user,
      likes: blog.likes + 1,
      title,
      author,
      url,
    }
    dispatch(likeBlog(blog.id, updatedBlog))
  }

  if(showDetails){
    return(
      <div className='blog' style={blogStyle}>
        <span className='title'>title: {blog.title}</span>
        <button onClick={toggleShowDetails}>Hide</button>
        <div>
          user: {blog.user.name}
        </div>
        <div>
          url: {blog.url}
        </div>
        <div>
          Likes: {blog.likes}
          <button onClick={() => addLike(blog)}>Like</button>
        </div>
        <div>
          author: {blog.author}
        </div>
        <button onClick={() => removeBlog(blog.id)}>Remove</button>
      </div>
    )
  }

  return(
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleShowDetails}>View</button>
    </div>
  )
}

export default Blog