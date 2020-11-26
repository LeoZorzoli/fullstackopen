import React, { useEffect } from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom' 

import blogService from './services/blogs'

import NavbarComponent from './components/Navbar'

import Notification from './components/Notification'

import HomePage from './components/pages/HomePage'
import BlogPage from './components/pages/BlogPage'
import UserPages from './components/pages/UsersPages'
import UserPage from './components/pages/UserPage'
import LoginPage from './components/pages/LoginPage'
import NewBlog from './components/pages/NewBlog'

import { initialBlogs } from './reducers/blogReducer'

import { initialUsers } from './reducers/userReducer'

import { useDispatch, useSelector } from 'react-redux'

const App = () => {

  const user = useSelector(state => state.login)

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


  return (
    <div>
      <Router>
        <NavbarComponent />
        <div>
          <Notification />
          <Switch>
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path='/newblog'>
              <NewBlog />
            </Route>
            <Route exact path='/blogs/:id'>
              <BlogPage />
            </Route>
            <Route exact path='/users'>
              <UserPages />
            </Route>
            <Route exact path='/users/:id'>
              <UserPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App