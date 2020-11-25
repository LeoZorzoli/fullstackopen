import React, { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'

import Navbar from './components/Navbar'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Toggable from './components/Togglable'
import BlogsList from './components/BlogsList'

import { initialBlogs } from './reducers/blogReducer'

import { logout } from './reducers/loginReducer'
import { initialUsers } from './reducers/userReducer'

import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const user = useSelector(state => state.login)

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialBlogs())
    dispatch(initialUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedInUserJSON = JSON.parse(
      window.localStorage.getItem('loggedBlogappUser'),
    )
    if (loggedInUserJSON) {
      const user = loggedInUserJSON
      blogService.setToken(user?.token)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user?.token)
  }, [user])

  
  const handleLogout = async () => {
    dispatch(logout())
  }

  const loginForm = () => {
    return(
      <div>
        <Toggable buttonLabel="Login">
          <LoginForm />
        </Toggable>
      </div>
    )
  }

  const blogForm = () => {
    return(
      <div>
        <Toggable buttonLabel="New blog" ref={blogFormRef}>
          <BlogForm />
        </Toggable>
      </div>
    )}

  return (
    <div>
      {user === null 
        ? loginForm() 
        : <div>
            <p>{user.name} <button onClick={handleLogout}>Logout</button></p>
            {blogForm()}
          </div>
      }
      <Navbar />
      <Notification />

    </div>
  )
}

export default App