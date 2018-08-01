import React, { Component } from 'react';

import login from '../../utils/login';

class Login extends Component {
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
    login(this.props, this.state);
    event.preventDefault();
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

export default Login;
