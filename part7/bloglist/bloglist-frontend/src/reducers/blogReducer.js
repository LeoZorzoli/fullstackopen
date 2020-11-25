import blogService from '../services/blogs'

export const createBlog = (content) => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch({
            type: 'NEW_BLOG',
            content: newBlog
        })
    }
}

export const initialBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const likeBlog = (id, likedBlog) => {
    return async dispatch => {
        await blogService.update(id, likedBlog)
        dispatch({
            type: 'LIKE_BLOG',
            data: { id }
        })
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch({
            type: 'DELETE_BLOG',
            data: { id }
        })
    }
}

const blogReducer = (state = [], action) => {
    switch(action.type) {
        case 'NEW_BLOG':
            return [...state, action.content]
        case 'INIT_BLOGS':
            return action.data
        case 'LIKE_BLOG': {
            const { id } = action.data
            const likedBlog = state.find(blog => blog.id === id)
            const updatedBlog = {
                ...likedBlog,
                likes: likedBlog.likes + 1
            }
            return state.map((blog) => 
                blog.id !== id ? blog : updatedBlog
            )
        }
        case 'DELETE_BLOG':
            const { id } = action.data
            return state.filter((blog) => blog.id !== id)
        default:
            return state
    }
}

export default blogReducer