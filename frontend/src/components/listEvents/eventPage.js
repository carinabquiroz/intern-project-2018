import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
    this.attendEvent = this.attendEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.unattendEvent = this.unattendEvent.bind(this);
  }

  attendEvent() {
    if (this.props.loggedIn) {
      console.log('attending the event');
      fetch('/attendEvent', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-access-token': window.localStorage.getItem('token'),
        },
        body: JSON.stringify({ eventId: this.props.info.id }),
      })
        .then(res => {
          this.props.loadEvents()
        });
    } else {
      this.setState({ redirect: true });
    }
  }

  deleteEvent() {
    fetch('/deleteEvent', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-access-token': window.localStorage.getItem('token'),
      },
      body: JSON.stringify({ eventId: this.props.info.id }),
    })
      .then(res => {
        console.log('event deleted')
        this.props.loadEvents()
      })
  }

  unattendEvent() {
    fetch('/unattendEvent', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-access-token': window.localStorage.getItem('token'),
      },
      body: JSON.stringify({ eventId: this.props.info.id }),
    })
      .then(res => {
        console.log('event unattended')
        this.props.loadEvents()
      })
  }

  render() {
    return (
      <div>
        <h3>{this.props.info.title}</h3>
        <h3>{this.props.info.description}</h3>
        <h3>{this.props.info.date}</h3>
        <h3>{this.props.info.time}</h3>
        <h3>{this.props.info.location}</h3>
        {
          !this.props.isAttending && !this.props.isHosting &&
          <button onClick={this.attendEvent}>
            Attend
          </button>
        }
        {
          this.props.isHosting &&
          <div><div> You are hosting this event! </div>
          <button onClick={this.deleteEvent}>
            Delete Event
          </button></div>
        }
        {
          this.props.isAttending &&
          <div><div> You are attending this event! </div>
          <button onClick={this.unattendEvent}>
            Cancel Attendance
          </button></div>
        }
        {this.state.redirect && <Redirect
          to={{
            pathname: '/login',
            state: { from: this.props.location },
          }}/>
        }
      </div>
    );
  }
}

const NotFound  = () =>
  <div>
    uh oh! We could not find your event!
  </div>;

export { NotFound };
export default EventPage;
