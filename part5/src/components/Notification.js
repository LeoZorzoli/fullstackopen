import React from 'react'

const Notification = ({ message, status }) => {
  if (message === null) {
    return null
  }

const successStyle = {
    color: 'green',
    fontSize: 20,
    marginBottom: 10,
  }

const errorStyle = {
    color: 'red',
    fontSize: 20,
    marginBottom: 10,
}

  if(status === 1) {
    return (
      <div style={successStyle}>
        {message}
      </div>
    )
  } else if(status === 2) {
    return (
      <div style={errorStyle}>
        {message}
      </div>
    )
  }

}

export default Notification