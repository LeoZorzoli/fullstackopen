
export const createNotification = (content, message) => {
    return {
            type: 'SET_NOTIFICATION',
            data: content,
            message: message
        }
}

export const deleteNotification = (id) => {
    return {
        type: 'DELETE_NOTIFICATION',
        id
    }
}   

const notificationReducer = (state = "", action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action
        case 'DELETE_NOTIFICATION':
            return ""
        default:
            return state
    }
}

export default notificationReducer