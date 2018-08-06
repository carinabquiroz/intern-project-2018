import React, { Component } from 'react';

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

  isUniqueUsername(username) {
    fetch('/checkUniqueUsername', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ isUnique: json.isUnique });
      })
  }

  handleSubmit(event) {
    //TODO: make sure passwords meet some standard
    event.preventDefault();
    this.isUniqueUsername(this.state.username);
    if (this.state.isUnique
      && isGoodPassword(this.state.password)
      && isGoodUsername(this.state.username)) {
      register(this.props, this.state);
    } else {this.setState({badRegistration: true})};
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
        {this.state.badRegistration && <div>Could not make account. Username or password is bad.</div>}
      </form>
    );
  }
};

export default Register;
