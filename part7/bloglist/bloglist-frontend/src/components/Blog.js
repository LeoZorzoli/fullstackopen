import React from 'react'

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 4,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div className='blog' style={blogStyle}>
      {blog.title} 
    </div>
  )
}

export default Blog