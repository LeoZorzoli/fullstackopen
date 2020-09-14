import React from 'react'

const Total = ({parts}) => {
  const total = parts.reduce((e, part) => e += part.exercises, 0)
    return(
        <p>
          Number of exercises {total}
        </p>
    )
  }

export default Total