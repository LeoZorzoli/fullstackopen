import React from 'react'
import { useRouteMatch  } from 'react-router-dom' 
import { useSelector } from 'react-redux'

const User = () => {

    const users = useSelector(state => state.user)
    const match = useRouteMatch('/users/:id')
    const user = match ? users.find(user => user.id === match.params.id) : null

    return(
        <div>
            <h2>{user.name}</h2>

            {user.blogs.length === 0 
              ? <div>
                    <p>No blogs added</p>
                </div>
              : <div>
                    <h3>Added blogs</h3>
                    <ul>   
                        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
                    </ul> 
                </div>
            }
        </div>
    )
}

export default User