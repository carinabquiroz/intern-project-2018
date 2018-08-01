import React, { Component } from 'react';

import register from '../../utils/register';
import isGoodPassword from '../../utils/password';

class Register extends Component {
  //TODO: extract out into components, use react-router to make into it's own page
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };

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

  handleSubmit(event) {
    //TODO: make sure passwords meet some standard
    event.preventDefault();
    if (isGoodPassword(this.state.password)) {
      register(this.props, this.state);
    };
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <label>
          Username:
          <input type="text" name="name" onChange={ this.handleUsernameChange }/>
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="name" onChange={ this.handlePasswordChange }/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
};

export default Register;
