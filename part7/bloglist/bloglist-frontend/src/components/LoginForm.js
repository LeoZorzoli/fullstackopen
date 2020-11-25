import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks/index'
import { login } from '../reducers/loginReducer'

const LoginForm = () => {

  const username = useField('text')
  const password = useField('password')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = {
        username: username.value,
        password: password.value,
      }
      
      dispatch(login(user))

    } catch(exception) {

    }
  }

  return(
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...username} />
        </div>
        <div>
          password
          <input {...password} />
        </div>
        <button id='login-button' type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm