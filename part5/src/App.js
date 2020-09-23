import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [status, setStatus] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

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

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      author: author,
      title: title,
      url: url,
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`a new blog "${title}" by "${author}" added`)
        setStatus(1)
        setAuthor('')
        setTitle('')
        setUrl('')
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
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

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const loginForm = () => (
  <form onSubmit={handleLogin}>
    <div>
    username
        <input
          type= 'text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
    </div>
    <div>
    password
        <input 
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
    </div>
    <button type='submit'>Login</button>
  </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <BlogForm
       valueTitle={title}
       valueAuthor={author}
       valueUrl={url}
       onChangeAuthor={handleAuthorChange}
       onChangeTitle={handleTitleChange}
       onChangeUrl={handleUrlChange}
      />
      <button type="submit">Create</button>
    </form>
  )

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
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App