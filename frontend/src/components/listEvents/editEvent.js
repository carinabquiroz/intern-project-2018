import React, { Component } from 'react';

import Tag from '../createEvent/tag';
import TagInput from '../createEvent/tagInput';
import { Container, Label, Entry, Submit, StyledText, Submitted } from '../createEvent';

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
      tags: this.props.info.tags,
      saved: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value, saved: false });
  }

  saveEvent(event) {
    this.setState({ saved: true });
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
      <Container>
        <div>
          <Label>
            Event Name:
            <Entry type="text" name="title" value={this.state.title} onChange={ this.handleChange } autoComplete="off" />
          </Label>
          <br />
          <Label>
            Description:
            <StyledText type="text" name="description" value={this.state.description} onChange={ this.handleChange } autoComplete="off" />
          </Label>
          <br />
          <Label>
            Date:
            <Entry type="date" name="date" value={this.state.date} onChange={ this.handleChange } autoComplete="off" />
          </Label>
          <br />
          <Label>
            Time:
            <Entry type="time" name="time" value={this.state.time} onChange={ this.handleChange } autoComplete="off" />
          </Label>
          <br />
          <Label>
            Location:
            <Entry type="text" name="location" value={this.state.location} onChange={ this.handleChange } autoComplete="off" />
          </Label>
          <br />
          <TagInput
            name="tags"
            onTagChange={this.handleChange}
            tags={this.state.tags} autoComplete="off" />
          {this.state.saved ? <Submitted>{`You're event has been saved`}</Submitted> : <Submit onClick={this.saveEvent}>Save Changes</Submit>}
        </div>
        {this.state.saved ? <Submit onClick={this.props.cancelEdit}>Back</Submit> : <Submit onClick={this.props.cancelEdit}>Cancel</Submit>}
      </Container>
    );
  }
}

export default EditEvent;
