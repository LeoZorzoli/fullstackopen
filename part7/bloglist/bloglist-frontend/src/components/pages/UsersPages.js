import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom' 
import { Container, Table } from 'react-bootstrap'

import './UsersPages.css'

const UsersPages = () => {
    const users = useSelector(state => state.user)

    return(
        <Container>
            <Table className="tableStyle">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Blogs</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => <tr key={user.name}><td key={user.id}><Link to={`/users/${user.id}`}>{user.name}</Link></td><td key={user.username}>{user.blogs.length}</td></tr>)}
                </tbody>
            </Table>

        </Container>
    )
}

export default UsersPages