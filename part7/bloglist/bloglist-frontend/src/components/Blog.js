import React from 'react'
import { Link } from 'react-router-dom'
import './Blog.css'

export const Blog = ({ blog }) => {

  return(
    <div className='blogStyle' >
      <Link to={`/blogs/${blog.id}`}> {blog.title} </Link>
    </div>
  )
}

export default Blog