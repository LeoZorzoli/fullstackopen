import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
    const padding = {
        paddingRight: 5
    }

    return(
        <div>
            <Link style={padding} to='/'>Home</Link>
            <Link style={padding} to='/about'>About</Link>
            <Link style={padding} to='/create'>Create New</Link>
        </div>
    )
}

export default Menu