import React from 'react'

const Person = ({person, handleDelete}) => {

    return (
        <li className='person' key={person.id}>
            {person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button>
        </li>
    )
}

export default Person