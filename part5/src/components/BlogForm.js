import React from 'react'
import Input from './Input'

const BlogForm = (props) => {
    return (
        <div>
            <Input onChange={props.onChangeTitle} value={props.valueTitle} text='Title: '/>
            <Input onChange={props.onChangeAuthor} value={props.valueAuthor} text='Author: '/>
            <Input onChange={props.onChangeUrl} value={props.valueUrl} text='Url: '/>
        </div>
    )
}

export default BlogForm