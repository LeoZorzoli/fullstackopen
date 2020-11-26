import React from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom' 
import { useSelector, useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../../reducers/blogReducer'
import { createNotification } from '../../reducers/notificationReducer'
import { Container, Button } from 'react-bootstrap'

import './BlogPage.css'

const Blog = () => {
    const blogs = useSelector(state => state.blogs)

    const dispatch = useDispatch()
    const history = useHistory()

    const match = useRouteMatch('/blogs/:id')
    const blog = match ? blogs?.find((blog) => blog.id === match.params.id) : null

    const removeBlog = async (id) => {
        dispatch(deleteBlog(id))
        history.push("/")
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
        dispatch(createNotification(`Blog liked`, 2))
    }
    
    if (!blog){
        return null
    } else {
        return(
            <Container>
                <div className="blogStyle">
                    <p><strong>Title:</strong> {blog.title}</p>
                    <div>
                        <p><strong>Author:</strong> {blog.author}</p>
                        <p><strong>Url:</strong> {blog.url}</p>
                        <p><strong>Likes:</strong> {blog.likes}</p>
                        <p><strong>Added by</strong> blog.user.name}</p>
                        <Button className="buttonStyle" variant="success" onClick={() => addLike(blog)}>Like</Button>
                        <Button className="buttonStyle" variant="danger" onClick={() => removeBlog(blog.id)}>Delete</Button>
                    </div>
                </div>
            </Container>
        )
    }
}

export default Blog