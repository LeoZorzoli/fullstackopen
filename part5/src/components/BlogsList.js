import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, likeblog, removeBlog }) => {
  const blogList = blogs.map(blog => (
    <Blog
      key={blog.id}
      blog={blog}
      likeBlog={likeblog}
      removeBlog={removeBlog}
    />
  ))

  return (
    <div>
      <h1>Blogs</h1>
      {blogList}
    </div>
  )
}

export default Blogs