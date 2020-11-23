import React from 'react'

const Anecdote = ({anecdote}) => {

    return (
        <div>
            <li>{anecdote.content} <small>has {anecdote.votes} votes</small></li>
        </div>
    );
}

export default Anecdote