import React from 'react'

const Notification = ({ message, status }) => {

    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      }
    
    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }


    if (status === 1){
        return (
            <div style={successStyle}>
                {message}
            </div>
        )
    }else if (status === 2){
        return (
            <div style={errorStyle}>
                {message}
            </div>
        )
    }else {
        return null
    }
}

export default Notification