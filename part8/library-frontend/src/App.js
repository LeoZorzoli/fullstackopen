
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'

import { useQuery, useApolloClient } from '@apollo/client'

import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }

  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  const client =  useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (authors.loading || books.loading) {
    return <div>loading...</div>
  } else {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          {token === null 
            ? <button onClick={() => setPage('login')}>Login</button>
            : <>
                <button onClick={() => setPage('add')}>add book</button>
                <button onClick={logout}>Logout</button>
              </>
          }
        </div>

        <Notify errorMessage={errorMessage} />
  
        <Authors
          show={page === 'authors'} authors={authors.data.allAuthors} notify={notify}
        />
  
        <Books
          show={page === 'books'} books={books.data.allBooks}
        />
  
        <NewBook
          show={page === 'add'} setError={notify}
        />

        <Login 
          show={page === 'login'}
          setToken={setToken}
          setError={notify}
        />
  
      </div>
    )
  }
}

export default App