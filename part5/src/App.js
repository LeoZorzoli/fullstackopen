import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Toggable from './components/Togglable'
import BlogsList from './components/BlogsList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [status, setStatus] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogList => {
        setBlogs( blogList )
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

  const updateLike = async (event, id) => {
    const blogObject = blogs.find(blog => blog.id === id)

    const updatedBlog = {
      ...blogObject,
      likes: blogObject.likes + 1,
      user: blogObject.user.id,
    }

    const returnedBlog = await blogService.update(id, updatedBlog)
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
  }

  const deleteBlog = async (event, id, title) => {
    try{
      const deleteAlert = window.confirm(`Delete ${title}`)
      if(!deleteAlert) return

      await blogService.remove(id)

      setBlogs(blogs.filter((blog) => blog.id !== id ))
    } catch(exception) {
      setMessage('Wrong credentials')
      setStatus(2)
      setTimeout(() => {
        setMessage(null)
        setStatus(null)
      }, 3000)
    }
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
      setTimeout(() => {
        setMessage(null)
        setStatus(null)
      }, 3000)

    } catch(exception) {
      setMessage('Wrong credentials')
      setStatus(2)
      setTimeout(() => {
        setMessage(null)
        setStatus(null)
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
      setStatus(null)
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
        <Toggable buttonLabel="New blog" ref={blogFormRef}>
          <BlogForm
            createBlog={addBlog}
          />
        </Toggable>
      </div>
    )}

  const sortBlogs = [...blogs].sort((currentBlog, nextBlog) => {
    return nextBlog.likes - currentBlog.likes
  })


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

      <BlogsList blogs={sortBlogs} likeblog={updateLike} removeBlog={deleteBlog}/>
    </div>
  )
}

export default App