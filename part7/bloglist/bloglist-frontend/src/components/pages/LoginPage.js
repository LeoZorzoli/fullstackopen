import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../../hooks/index'
import { login } from '../../reducers/loginReducer'
import { useHistory } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'

import './LoginPage.css'

const LoginPage = () => {
    const username = useField('text')
    const password = useField('password')
  
    const dispatch = useDispatch()
    const history = useHistory()
  
    const handleLogin = async (event) => {
        event.preventDefault()
        const user = {
          username: username.value,
          password: password.value,
        }
        
        dispatch(login(user))
        history.push('/')
    }
  
    return(
        <Container>
            <Form className="loginStyle" onSubmit={handleLogin}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="Username"  {...username} />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control placeholder="Password"  {...password} />
                </Form.Group>
                <Button variant="primary" id='login-button' type="submit">Login</Button>
            </Form>
        </Container>
    )
}

export default LoginPage