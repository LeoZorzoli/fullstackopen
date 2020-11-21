import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { createNotification, deleteNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {

    return (
    <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={handleClick}>vote</button>
        </div>
    </div>
    )
}

const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const anecdotesSorted = [...anecdotes].sort((a, b) => {
        return b.votes - a.votes
    })

    const vote = (anecdote) => {
        dispatch(addVote(anecdote.content, anecdote.id))
        dispatch(createNotification(anecdote.content))
    }

    return (
        <div>
            {anecdotesSorted.map(anecdote => 
                <Anecdote
                  key={anecdote.id}
                  anecdote={anecdote}
                  handleClick={() => 
                    vote(anecdote)}
                />
            )}
        </div>
    )
}

export default Anecdotes