import React from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom' 
import { useSelector, useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../../reducers/blogReducer'

const User = () => {

    const blogs = useSelector(state => state.blogs)
    const match = useRouteMatch('/blogs/:id')
    const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

    const dispatch = useDispatch()
    const history = useHistory()

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
    }
    

    return(
        <div>
            <h2>Title: {blog.title}</h2>
            <div>
                <p>Author: {blog.author}</p>
                <p>Url: {blog.url}</p>
                <p>Likes: {blog.likes}</p>
                <p>Added by {blog.user.name}</p>
                <button onClick={() => addLike(blog)}>Like</button>
                <button onClick={() => removeBlog(blog.id)}>Delete</button>
            </div>
            
        </div>
    )
}

export default User