import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Alert } from 'react-bootstrap'
import './Notification.css'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const noti = () => {
    return (
      <Container>
        <div className="notification"> 
          {(notification.message &&
            <Alert variant="success">
              {notification.message}
            </Alert>
          )}
        </div> 
      </Container>
    )
  }


  return notification !== '' 
    ? noti()
    : <> </>

}

export default Notification