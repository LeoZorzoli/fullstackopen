import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer.js'
import { createNotification, deleteNotification } from '../reducers/notificationReducer.js'

const NewAnecdote = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(createNotification(content, 'you create'))
        setTimeout(() => {
            dispatch(deleteNotification(content.id))
        }, 5000)
    }

    return(
        <form onSubmit={addAnecdote}>
            <h2>Create new</h2>
            <input name="anecdote" />
            <button type="submit">Add</button>
        </form>
    )
}

export default NewAnecdote