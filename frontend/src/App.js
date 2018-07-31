import React from 'react';
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
import CreateEvent from './components/createEvent/'
import ListEvents from './components/listEvents/'
import BasicExample from './components/examples/router';

const StyledDiv = styled.div`
  text-align: center;
`;

const App = () => (
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
        <li><Link to='/listEvents'>List Events</Link></li>
      </ul>
      <hr />
      <Route exact path='/' component={Home}/>
      <Route path='/register' component ={Register} />
      <Route path='/login' component ={Login} />
      <Route path='/createEvent' component ={CreateEvent} />
      <Route exact path='/listEvents' component ={ListEvents} />
    </StyledDiv>
  </Router>
);

export default App;
