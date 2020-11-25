import React from 'react'
import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom' 

const UsersPages = () => {
    const users = useSelector(state => state.user)

    return(

        <div>
            <table>
                <tbody>
                    <tr>
                        <th>User</th>
                        <th>Blogs</th>
                    </tr>
                    {users.map(user => <tr key={user.name}><td key={user.id}><Link to={`/users/${user.id}`}>{user.name}</Link></td><td key={user.username}>{user.blogs.length}</td></tr>)}
                </tbody>
            </table>

        </div>
    )
}

export default UsersPages