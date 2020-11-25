import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {

    fontSize: 20,
    marginBottom: 10,
  }


  return notification !== '' 
    ? <div style={style}> {notification.message}</div> 
    : <> </>

}

export default Notification