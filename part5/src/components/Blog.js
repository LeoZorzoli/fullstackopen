import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog }) => {
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

  if(showDetails){
    return(
      <div className='blog' style={blogStyle}>
        <span className='title'>{blog.title}</span>
        <button onClick={toggleShowDetails}>Hide</button>
        <div>
          {blog.url}
        </div>
        <div>
          Likes: {blog.likes}
          <button onClick={(event) => likeBlog(event, blog.id)}>Like</button>
        </div>
        <div>
          {blog.author}
        </div>
        <button onClick={(event) => removeBlog(event, blog.id, blog.title)}>Remove</button>
      </div>
    )
  }

  return(
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleShowDetails}>View</button>
    </div>
  )
}

export default Blog