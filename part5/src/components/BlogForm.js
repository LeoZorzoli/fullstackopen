import React, { useState} from 'react'
import Input from './Input'

const BlogForm = ({ 
    createBlog,
}) => {
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
          author: author,
          title: title,
          url: url,
        })

        setAuthor('')
        setTitle('')
        setUrl('')
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

    return (
        <div>
            <form onSubmit={addBlog}>
                <Input onChange={handleTitleChange} value={title} text='Title: '/>
                <Input onChange={handleAuthorChange} value={author} text='Author: '/>
                <Input onChange={handleUrlChange} value={url} text='Url: '/>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default BlogForm