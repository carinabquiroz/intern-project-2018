import React, { Component } from 'react';

class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.info.id,
      title: this.props.info.title,
      description: this.props.info.description,
      date: this.props.info.date,
      time: this.props.info.time,
      location: this.props.info.location,
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  saveEvent(event) {
    fetch('/editEvent', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-access-token': window.localStorage.getItem('token'),
      },
      body: JSON.stringify(this.state),
    })
      .then(res => {
        console.log('edited event');
        this.props.loadEvents();
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.saveEvent }>
          <label>
            Title:
            <input type="text" name="title" value={this.state.title} onChange={ this.handleChange }/>
          </label>
          <br />
          <label>
            Description:
            <input type="text" name="description" value={this.state.description} onChange={ this.handleChange }/>
          </label>
          <br />
          <label>
            Date:
            <input type="date" name="date" value={this.state.date} onChange={ this.handleChange }/>
          </label>
          <br />
          <label>
            Time:
            <input type="time" name="time" value={this.state.time} onChange={ this.handleChange }/>
          </label>
          <br />
          <label>
            Location:
            <input type="text" name="location" value={this.state.location} onChange={ this.handleChange }/>
          </label>
          <br />
          <input type="submit" value="Save" />
        </form>
        <button onClick={this.props.cancelEdit}> Cancel </button>
      </div>
    );
  }
}

export default EditEvent;
