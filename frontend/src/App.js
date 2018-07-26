import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import styled from 'styled-components';

import logo from './logo.svg';
import './App.css';
import Signup from './components/signup/';
import Login from './components/login/'
import Home from './components/home/';
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
        <li><Link to='/signup'>Signup</Link></li>
        <li><Link to='/login'>Signup</Link></li>
      </ul>
      <hr />
      <Route exact path='/' component={Home}/>
      <Route path='/signup' component ={Signup} />
      <Route path='/login' component ={Login} />
    </StyledDiv>
  </Router>
);

export default App;
