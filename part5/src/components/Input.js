import React from 'react'

const Input = (props) => {
    return(
        <div>
            {props.text} <input onChange={props.onChange} value={props.value} />
        </div>
    )
}

export default Input