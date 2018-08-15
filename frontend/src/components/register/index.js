import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import register from '../../utils/register';
import isGoodPassword from '../../utils/password';
import isGoodUsername from '../../utils/username';
import {Entry, Label, Submit} from '../createEvent';
import {StyledContainer} from '../login';

class Register extends Component {
  //TODO: extract out into components, use react-router to make into it's own page
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isUnique: true,
      isValidPassword: true,
      isValidUsername: true,
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  async isUniqueUsername(username) {
    return fetch('/checkUniqueUsername', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ isUnique: json.isUnique });
      });
  }

  async handleSubmit(event) {
    this.setState({
      isUnique: true,
      isValidPassword: true,
      isValidUsername: true,})
    event.preventDefault();
    await this.isUniqueUsername(this.state.username);
    if (!this.state.isUnique) {
      return;
    }
    else if (!isGoodUsername(this.state.username)) {
      this.setState({isValidUsername: false})
      return;
    }
    else if (!isGoodPassword(this.state.password)) {
      this.setState({isValidPassword: false})
      return;
    }
    else {
      register(this.props, this.state);
    }
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
          <Text> *Min of four characters, max of fifteen</Text>
          {!this.state.isUnique && <Error> Username is already in use </Error>}
          {!this.state.isValidUsername && <Error> Invalid username </Error>}
          <br />
          <br />
          <Label>
            Password:
            <Entry type="password" name="name" onChange={ this.handlePasswordChange }/>
          </Label>
          <Text> *Min of eight characters.
          Should include a capital letter, lowercase letter, number, and special character
          </Text>
          {!this.state.isValidPassword && <Error> Invalid Password </Error>}
          <br />
          <Submit onClick={this.handleSubmit}>Sign up</Submit>
          <br />
        <Link to={{
          pathname: '/login',
          state: { from },
        }}>Already a user? Login here</Link>
      </StyledContainer>
    );
  }
};

const Text = styled.div`
  font-size: 10px;
  display: block;
  width: 300px;
`;

const Error = styled.div`
  color: red;
`;

export {Error};
export default withRouter(Register);
