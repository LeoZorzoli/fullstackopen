import React from 'react'
import { useSelector } from 'react-redux'

import { Container } from 'react-bootstrap'

import { Blog } from '../Blog'

const HomePage = () => {

    const blogs = useSelector(state => state.blogs)

    const sortBlogs = [...blogs].sort((currentBlog, nextBlog) => {
      return nextBlog.likes - currentBlog.likes
    })
  
    const blogList = sortBlogs.map(blog => (
        <Blog
          blog={blog}
          key={blog.id}
        />
    ))
  
    return(
        <Container>
            {blogList}
        </Container>
    )
}

export default HomePage