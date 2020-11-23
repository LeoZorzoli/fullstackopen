import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

import Filter from './Filter'

const Anecdote = ({ anecdote, handleClick }) => {

    return (
    <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
            has {anecdote.votes} <button onClick={handleClick}>vote</button>
        </div>
    </div>
    )
}

const Anecdotes = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const anecdotesSorted = [...anecdotes].sort((a, b) => {
        return b.votes - a.votes
    })

    const filteredAnecdotes = anecdotesSorted.filter(anecdote => 
        anecdote.content.toLowerCase().includes(filter.toLowerCase()))

    const vote = (anecdote) => {
        dispatch(addVote(anecdote))
        dispatch(createNotification(`you voted ${anecdote.content}`, 5))
    }

    return (
        <div>
            <Filter />
            {filteredAnecdotes.map(anecdote => 
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