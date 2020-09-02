import React from 'react'

const Filter = (props) => {
    const text = 'filter shown with'
    return (
        <div>
            {text} <input value={props.value} onChange={props.onChange} />
        </div>
    )
}

export default Filter