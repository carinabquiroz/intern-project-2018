import React, { Component } from 'react';

import TagInput from './tagInput';

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      tags: [],
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/createEvent', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-access-token': window.localStorage.getItem('token'),
      },
      body: JSON.stringify(this.state),
    })
      .then(res => {
        if ((200 <= res.status) && (res.status < 300)) {
          this.setState({
            title: '',
            description: '',
            date: '',
            time: '',
            location: '',
            tags: [],
            submitted: true,
          });
        }
      });
  }

  render() {
    return (
      <div>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}/>
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}/>
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={this.state.date}
            onChange={this.handleChange}/>
        </label>
        <br />
        <label>
          Time:
          <input
            type="time"
            name="time"
            value={this.state.time}
            onChange={this.handleChange}/>
        </label>
        <br />
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={this.state.location}
            onChange={this.handleChange}/>
        </label>
        <br />
        <label>
          Tags:
          <TagInput
            name="tags"
            onTagChange={this.handleChange}
            tags={this.state.tags} />
        </label>
        <button onClick={this.handleSubmit}>Submit</button>
        {this.state.submitted && <div>{`You're event has been submitted!`}</div>}
      </div>
    );
  }
};

export default CreateEvent;
