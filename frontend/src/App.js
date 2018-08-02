import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import styled from 'styled-components';

import logo from './logo.svg';
import './App.css';
import Register from './components/register/';
import Login from './components/login/';
import Home from './components/home/';
import CreateEvent from './components/createEvent/';
import ListEvents from './components/listEvents/';
import ProtectedRoute from './components/protectedRoute';

const StyledDiv = styled.div`
  text-align: center;
`;

class App extends Component {

  constructor(props) {
    super(props);
    if (window.localStorage.getItem('token')) {
      this.state = { loggedIn: true };
    } else {
      this.state = { loggedIn: false };
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
  }

  componentWillMount () {
    this.checkAuth();
  }

  async checkAuth() {
    const token = window.localStorage.getItem('token');
    if (token) {
      const jsonPromise = await fetch('/auth', {
          method: 'POST',
          headers: { 'content-type': 'application/json',
          },
          body: JSON.stringify({ token: token }),
        });
      const result = await jsonPromise.json();
      this.setState({ loggedIn: result.auth });
    } else {
      this.setState({ loggedIn: false });
    }
  }

  login(token) {
    window.localStorage.setItem('token', (token));
    this.setState({ loggedIn: true });
  }

  logout() {
    window.localStorage.removeItem('token');
    this.setState({ loggedIn: false });
  }

  render() {
    return (
      <Router>
        <StyledDiv>
          <header className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <h1 className='App-title'>Welcome to React</h1>
          </header>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/createEvent'>Create Event</Link></li>
            <li><Link to='/events'>List Events</Link></li>
          </ul>
          <hr />
          <Route exact path='/' component={Home}/>
          <Route path='/register' render={() => <Register login={this.login} />} />
          <Route path='/login' render={() => <Login login={this.login} />} />
          <Route path='/createEvent' component ={CreateEvent} />
          <ProtectedRoute
            path='/events'
            component = {ListEvents}
            loggedIn = {this.state.loggedIn} />
        </StyledDiv>
      </Router>
    );
  }
}

export default App;
