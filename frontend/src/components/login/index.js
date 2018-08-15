import React, { Component } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';

import login from '../../utils/login';
import {Entry, Container, Label, Submit} from '../createEvent';
import {Error} from '../register';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', validLogin: true};

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.invalidLogin = this.invalidLogin.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    this.setState({validLogin:true})
    login(this.props, this.state, this.invalidLogin);
  }

  invalidLogin() {
    this.setState({validLogin:false})
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    return (
      <StyledContainer>
        {this.props.loggedIn && <Redirect to={from} />}
          <Label>
            Username:
            <Entry type="text" name="name" onChange={ this.handleUsernameChange }/>
          </Label>
          <br />
          <Label>
            Password:
            <Entry type="password" name="name" onChange={ this.handlePasswordChange }/>
          </Label>
          <Submit onClick={this.handleSubmit}>Login</Submit>
          <br />
          {!this.state.validLogin && <Error> Invalid login. Try again. </Error>}
          <br />
        <Link to={{
          pathname: '/register',
          state: { from },
        }}>New? Register here</Link>
      </StyledContainer>
    );
  }
};

const StyledContainer = styled(Container)`
  width: 300px
`;

export {StyledContainer};
export default withRouter(Login);
