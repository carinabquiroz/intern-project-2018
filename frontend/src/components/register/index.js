import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import register from '../../utils/register';
import isGoodPassword from '../../utils/password';
import isGoodUsername from '../../utils/username';

class Register extends Component {
  //TODO: extract out into components, use react-router to make into it's own page
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isUnique: '',
      badRegistration: false,
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
    event.preventDefault();
    await this.isUniqueUsername(this.state.username);
    if (isGoodUsername(this.state.username)
      && isGoodPassword(this.state.password)
      && this.state.isUnique) {
      this.setState({ badRegistration: false });
      register(this.props, this.state);
    } else {
      this.setState({ badRegistration: true });
    };
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    return (
      <div>
        {this.props.loggedIn && <Redirect to={from} />}
        <form onSubmit={ this.handleSubmit }>
          <Block>
            Username:
            <input type="text" name="name" onChange={ this.handleUsernameChange }/>
            <Text> Minimum of four characters</Text>
          </Block>
          <br />
          <br />
          <Block>
            Password:
            <input type="password" name="name" onChange={ this.handlePasswordChange }/>
            <Text> Minimun of eight characters.
            Should include a capital letter, lowercase letter, number, and special character
            </Text>
          </Block>
          <br />
          <input type="submit" value="Submit" />
          <br />
          {this.state.badRegistration &&
            <div>Could not make account. Username or password is bad.</div>}
        </form>
      </div>
    );
  }
};

const Block = styled.label`
  display: flex;
  justify-content: center
  align-items: center
`
const Text = styled.div`
  display: block;
  width: 300px;
`;

export default withRouter(Register);
