import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {

  const blogs = useSelector(state => state.blogs)

  const sortBlogs = [...blogs].sort((currentBlog, nextBlog) => {
    return nextBlog.likes - currentBlog.likes
  })

  const blogList = sortBlogs.map(blog => (
    <Link to={`/blogs/${blog.id}`}><Blog
      key={blog.id}
      blog={blog}
    />
    </Link>
  ))

  return (
    <div>
      <h1>Blogs</h1>
      {blogList}
    </div>
  )
}

export default Blogs