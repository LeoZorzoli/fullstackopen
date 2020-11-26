import React from 'react'
import { useRouteMatch  } from 'react-router-dom' 
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'

import './UserPage.css'

const User = () => {

    const users = useSelector(state => state.user)

    const match = useRouteMatch('/users/:id')
    const user = match ? users.find(user => user.id === match.params.id) : null

    if(!user){
        return null
    } else {
        return(
            <Container>
                <div className="userStyle">
                    {user.blogs.length === 0 
                      ? <div>
                            <p className="title">{user.name} have no blogs added</p>
                        </div>
                      : <div>
                            <p className="title">Blogs added by {user.name}</p>
                            <ul>   
                                {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
                            </ul> 
                        </div>
                    }
                </div>
            </Container>
        )
    }
}

export default User