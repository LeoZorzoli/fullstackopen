import React from 'react'
import { useRouteMatch  } from 'react-router-dom' 
import { useSelector } from 'react-redux'

const User = () => {

    const blogs = useSelector(state => state.blogs)
    const match = useRouteMatch('/blogs/:id')
    const blog = match ? blogs.find(blog => blog.id === match.params.id) : null
    

    return(
        <div>
            <h2>Title: {blog.title}</h2>
            <div>
                <p>Author: {blog.author}</p>
                <p>Url: {blog.url}</p>
                <p>Added by {blog.user.name}</p>
            </div>
            
        </div>
    )
}

export default User