import anecdoteService from '../services/anecdotes'

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      content: newAnecdote
    })
  }
}

export const addVote = (anecdote) => {
  return async (dispatch) => {
    anecdote.votes += 1
    const anecdoteVoted = await anecdoteService.addVote(anecdote)
    dispatch({
      type: 'ADD_VOTE',
      data: { anecdoteVoted }
    })
  }
}

export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}


const reducer = (state = [], action) => {

  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.content]
    case 'INIT_ANECDOTES':
      return action.data
    case 'ADD_VOTE':
      const anecdoteVoted = action.data
      return state.map((anecdote) => 
        anecdote.id !== anecdoteVoted.id ? anecdote : anecdoteVoted

      )
    default:
      return state
  }
}

export default reducer