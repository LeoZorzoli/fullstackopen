import React from 'react'

const Part: React.FC<{ part: any }> = ({ part }) => {
    return (
        <div>
            <p>{part.name} {part.exerciseCount}</p>
        </div>
    )
}

const Content: React.FC<{ courseParts: any }> = ({ courseParts }) => {
    return (
        <div>
            {courseParts.map((part: any) => (
                <Part key={part.id} part={part} />
            ))}
        </div>
    )
}

export default Content