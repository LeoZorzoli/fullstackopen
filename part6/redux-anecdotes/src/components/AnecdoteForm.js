import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer.js'
import { createNotification } from '../reducers/notificationReducer.js'

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(createNotification(`you create ${content}`, 5))
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