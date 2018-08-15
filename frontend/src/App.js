import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import styled from 'styled-components';

import './App.css';
import Register from './components/register/';
import Login from './components/login/';
import Home from './components/home/';
import CreateEvent from './components/createEvent/';
import ListEvents from './components/listEvents/';
import Navbar from './components/navbar';
import TitleBar from './components/titleBar';

const StyledRouterDiv = styled.div`
  text-align: center;
  flex: 1;
`;

const StyledDiv = styled.div`
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
`;

const Footer = styled.div`
  margin: 40px auto 5px;
  padding-bottom: 10px;
  font-size: 10px;
  display: flex;
  flex-direction: row;
  align-self: flex-end;
  justify-content: center;
  align-items: center;
`;

const Line = styled.div`
  border: 1px solid #000;
  margin: 0 10px;
`;

const Spacer = styled.div`
  margin: 0 10px;
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
      <StyledDiv>
      <Router>
      <StyledRouterDiv>
          {TitleBar}
          {this.state.loggedIn &&
          <Navbar
            loggedIn={this.state.loggedIn}
            checkAuth={this.checkAuth}
            logout={this.logout}/>
          }
          <Route exact path='/' render={props =>
            <Home loggedIn={this.state.loggedIn} {...props} />
          } />
          <Route path='/register' render={() =>
            <Register
              login={this.login}
              loggedIn = {this.state.loggedIn} />
          } />
          <Route path='/login' render={() =>
            <Login
              login={this.login}
              loggedIn = {this.state.loggedIn}/>
          } />
          <Route path='/createEvent' component = {CreateEvent} />
          <Route
            path='/events'
            render={(props) =>
              <ListEvents loggedIn={this.state.loggedIn} {...props} />}
          />
      </StyledRouterDiv>
      </Router>
      <Footer>
        <div>Icons made by: </div>
        <Spacer />
        <div><a href="https://www.flaticon.com/authors/zurb" title="Zurb">Zurb</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
      <Line />
      <div><a href="https://www.flaticon.com/authors/lyolya" title="Lyolya">Lyolya</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
      <Line />
        <div><a href="https://www.flaticon.com/authors/twitter" title="Twitter">Twitter</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
      </Footer>
      </StyledDiv>
    );
  }
}

export default App;
