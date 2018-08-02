import React, { Component } from 'react';

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  handleDateChange(event) {
    this.setState({ date: event.target.value });
  }

  handleTimeChange(event) {
    this.setState({ time: event.target.value });
  }

  handleLocationChange(event) {
    this.setState({ location: event.target.value });
  }

  handleSubmit(event) {
    fetch('/createEvent', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-access-token': window.localStorage.getItem('token'),
      },
      body: JSON.stringify(this.state),
    })
      .then(res => {
        console.log(res.status);
      });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <label>
          Title:
          <input type="text" name="name" onChange={ this.handleTitleChange }/>
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="name" onChange={ this.handleDescriptionChange }/>
        </label>
        <br />
        <label>
          Date:
          <input type="date" name="name" onChange={ this.handleDateChange }/>
        </label>
        <br />
        <label>
          Time:
          <input type="time" name="name" onChange={ this.handleTimeChange }/>
        </label>
        <br />
        <label>
          Location:
          <input type="text" name="name" onChange={ this.handleLocationChange }/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
};

export default CreateEvent;
