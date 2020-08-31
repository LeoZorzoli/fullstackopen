import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVotes] = useState(Array.apply(null, Array(props.anecdotes.length)).map(Number.prototype.valueOf,0))
  const [mostVotes, setMostVotes] = useState(0)

  const handleRandom = () => {
    const random = Math.floor(Math.random() * props.anecdotes.length)
    setSelected(random)
  }

  const handleVote = () => {
    const copy = {...vote}
    copy[selected] += 1
    setVotes(copy)
    if(copy[selected] > vote[mostVotes]){
      setMostVotes(selected)
    }
  }

  return (
    <div>
      {props.anecdotes[selected]}
      <br />
      has {vote[selected]} votes
      <Button onClick={handleVote} text='vote' />
      <Button onClick={handleRandom} text='next' /> 
      <h1>Anecdotes with most votes</h1>
      {props.anecdotes[mostVotes]}
    </div>
  )
}

const Button = ({onClick, text}) => {
  return (
    <div>
      <button onClick={onClick}>
        {text}
      </button>
    </div>
  )
}




const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)