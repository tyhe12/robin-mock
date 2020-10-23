import React, { useEffect } from 'react';
import { BrowserRouter as Router, NavLink, Switch, Route } from 'react-router-dom';
import {
  useUser,
  useSetUser
} from './UserContext'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import Home from './home'

function App() {
  const user = useUser()
  const setUser = useSetUser()

  useEffect(() => {
    if (user) return
    
    setTimeout(() => {
      setUser({
        name: 'admin user',
        assets: [
          {
            ticker: 'AAPL',
            type: 'equity',
            cost: 3000,
            share: 25
          },
          {
            ticker: 'NVDA',
            type: 'equity',
            cost: 5000,
            share: 20
          },
          {
            ticker: 'AMZN',
            type: 'equity',
            cost: 20000,
            share: 10
          },
          {
            ticker: 'X:BTCUSD',
            type: 'crypto',
            cost: 5000,
            share: 2
          }
        ]
      })
    }, 500)
  }, [])
  return (
    <div className="App">
      <Router>
        <Navbar bg="dark">
          <Nav className="mr-auto">
            <NavLink as={Nav.Link} to="/">Home</NavLink>
          </Nav>
        </Navbar>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
