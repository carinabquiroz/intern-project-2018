import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MyEvents extends Component {
  constructor(props) {
    super(props);
    this.state = { attending: [], hosting: [] };
  }

  componentDidMount() {
    fetch('/userEvents', {
        method: 'GET',
        headers: {
          'x-access-token': window.localStorage.getItem('token'),
        },
      })
        .then(res => {
          console.log(res.status);
          if (200 <= res.status < 200) {
            return res.json().then(json => this.setState({
              attending: json.attending,
              hosting: json.hosting,
            }));
          } else {
            console.log('something went wrong on the server!!');
          }
        }
      );
  }

  render() {
    return (
    <div>
      <div>Hosting</div>
      {this.state.hosting.map(event =>
        <li key={event.id}><Link to={'/events/' + event.id}>{event.title}</Link></li>
      )}
      <div>Attending</div>
      {this.state.attending.map(event =>
        <li key={event.id}><Link to={'/events/' + event.id}>{event.title}</Link></li>
      )}
    </div>

  );}
}

export default MyEvents;
