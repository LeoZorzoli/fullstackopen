import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {

    const vote = (id) => {
        console.log('vote', id)
    }

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
    const anecdotes = useSelector(state => state)

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote => 
                <Anecdote
                  key={anecdote.id}
                  anecdote={anecdote}
                  handleClick={() => 
                    dispatch(addVote(anecdote.id))}
                />
            )}
        </div>
    )
}

export default Anecdotes