import React from 'react'

const Person = (props) => {
    return (
        <div key={props.id}>
            {props.name} {props.number}
        </div>
    )
}

export default Person