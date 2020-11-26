import React from 'react'
import { Link } from 'react-router-dom' 
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { logout } from '../reducers/loginReducer'
import './Navbar.css'

const NavbarComponent = () => {
    const user = useSelector(state => state.login)

    const dispatch = useDispatch()

    const handleLogout = async () => {
        dispatch(logout())
    }

    if(user){
        return(
            <Container>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#" as="span">
                                <Link className="nav-link linkStyle" to="/">Blogs</Link>
                            </Nav.Link>
                            <Nav.Link href="#" as="span">
                                <Link className="nav-link linkStyle" to="/users">Users</Link>
                            </Nav.Link>
                            <Nav.Link href="#" as="span">
                                <Link className="nav-link linkStyle" to="/newblog">New Blog</Link>
                            </Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Link href="#" as="span">
                                <Link to="/" className="nav-link linkStyle" onClick={handleLogout} >Logout</Link>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>

        )
    } else {
        return(
            <Container>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#" as="span">
                                <Link className="nav-link linkStyle" to="/">Blogs</Link>
                            </Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Link href="#" as="span">
                                <Link className="nav-link linkStyle" to="/login">Login</Link>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        )
    }
}

export default NavbarComponent