import React from 'react';
import { Link } from 'react-router-dom';

const MyEvents = (props) => {
  const hostingIds = props.hostingIds;
  const attendingIds = props.attendingIds;
  const events = props.events;
  let hostingEvents = [];
  let attendingEvents = [];
  events.forEach((event) => {
    if (hostingIds.includes(event.id)) {
      hostingEvents.push(event);
    } else if (attendingIds.includes(event.id)) {
      attendingEvents.push(event);
    }
  });
  return (
  <div>
    <div>Hosting</div>
    {hostingEvents.map(event =>
      <li key={event.id}><Link to={'/events/' + event.id}>{event.title}</Link></li>
    )}
    <div>Attending</div>
    {attendingEvents.map(event =>
      <li key={event.id}><Link to={'/events/' + event.id}>{event.title}</Link></li>
    )}
  </div>

);
};

export default MyEvents;
