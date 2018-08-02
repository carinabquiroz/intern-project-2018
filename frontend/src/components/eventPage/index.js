import React, { Component } from 'react';

class EventPage extends Component {

  render() {
    return (
      <div>
        <h3>{this.props.info.title}</h3>
        <h3>{this.props.info.description}</h3>
        <h3>{this.props.info.date}</h3>
        <h3>{this.props.info.time}</h3>
        <h3>{this.props.info.location}</h3>
      </div>
    );
  }
}

export default EventPage;
