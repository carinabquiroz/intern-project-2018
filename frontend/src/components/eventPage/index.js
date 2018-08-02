import React, { Component } from 'react';

const EventPage = (props) =>
  <div>
    <h3>{props.info.title}</h3>
    <h3>{props.info.description}</h3>
    <h3>{props.info.date}</h3>
    <h3>{props.info.time}</h3>
    <h3>{props.info.location}</h3>
  </div>;

const NotFound  = () =>
  <div>
    uh oh! We could not find your event!
  </div>;

export { NotFound };
export default EventPage;
