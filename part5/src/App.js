import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Toggable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [status, setStatus] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        setBlogs( blogs )
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  const updateLike = (event, id) => {
    const blogObject = blogs.find(blog => blog.id === id)

    const updatedBlog = {
      ...blogObject,
      likes: blogObject.likes + 1,
      user: blogObject.user.id,
    }

    blogService.update(id, updatedBlog)
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
  }

  const deleteBlog = async (event, id, title) => {
    const deleteAlert = window.confirm(`Delete ${title}`)

    if(!deleteAlert) return

    await blogService.remove(id)

    setBlogs(blogs.filter((blog) => blog.id !== id ))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setMessage('Successful logged')
      setStatus(1)
      setUsername('')
      setPassword('')
      setTimeout(() => { setMessage(null)
      }, 3000)

    } catch(exception) {
      setMessage('Wrong credentials')
      setStatus(2)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const handleLogout = async () => {
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setMessage('Logged out')
    setStatus(1)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const loginForm = () => {
    return(
      <div>
        <Toggable buttonLabel="Login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Toggable>
      </div>
    )
  }

  const blogForm = () => {
    return(
      <div>
        <Toggable buttonOpen="New blog" buttonClose="Close" ref={blogFormRef}>
          <BlogForm
            createBlog={addBlog}
          />
        </Toggable>
      </div>
    )}

  return (
    <div>
      <Notification status={status} message={message} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} <button onClick={handleLogout}>Logout</button></p>
          {blogForm()}
        </div>
      }

      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={updateLike} removeBlog={deleteBlog}/>
      )}
    </div>
  )
}

export default App