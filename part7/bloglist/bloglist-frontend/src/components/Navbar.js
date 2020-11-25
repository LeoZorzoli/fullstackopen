import React from 'react'
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom' 

import UsersPage from './pages/UsersPages'
import User from './pages/User'
import HomePage from './pages/HomePage'
import Blog from './pages/Blog'

const Navbar = () => {

    return(
        <div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>

                    <Route exact path="/users">
                        <UsersPage />
                    </Route>

                    <Route path="/users/:id">
                        <User />
                    </Route>

                    <Route path="/blogs/:id">
                        <Blog />
                    </Route>

                </Switch>
            </Router>
        </div>
    )
}

export default Navbar