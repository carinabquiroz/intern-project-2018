import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
    this.attendEvent = this.attendEvent.bind(this);
  }

  attendEvent() {
    if (this.state.loggedIn) {
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
          console.log(res.status);
        });
    } else {
      this.setState({ redirect: true });
    }
  }

  render() {
    return (
      <div>
        <h3>{this.props.info.title}</h3>
        <h3>{this.props.info.description}</h3>
        <h3>{this.props.info.date}</h3>
        <h3>{this.props.info.time}</h3>
        <h3>{this.props.info.location}</h3>
        <button
          onClick={this.attendEvent}>
          Attend
        </button>
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
