import loginService from '../services/login'

const loggedInUserJSON = JSON.parse(
    window.localStorage.getItem('loggedBlogappUser'),
  )

const initialState = loggedInUserJSON ? loggedInUserJSON : null

export const login = (userToLogged) => {
    return async dispatch => {
        const user = await loginService.login(userToLogged)
        dispatch({
            type: 'LOGIN',
            data: user
        })
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}

const loginReducer = (state = initialState, action) => {
    switch(action.type){
        case 'LOGIN':
            return action.data
        case 'LOGOUT': {
            return null 
        }
        default:
            return state
    }
}

export default loginReducer