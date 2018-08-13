import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import EventTile from './eventTile';
import { EventsDiv } from './eventList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 20px;
  font-weight: bold;
  margin-top: 40px;
  padding-left: 5px;
  text-align: left;
`;

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
  <Container>
    <Label>Hosting</Label>
    <EventsDiv>
      {hostingEvents.map(event =>
        <EventTile key={event.id} to={'/events/' + event.id} title={event.title} />
      )}
    </EventsDiv>
    <Label>Attending</Label>
    <EventsDiv>
      {attendingEvents.map(event =>
        <EventTile key={event.id} to={'/events/' + event.id} title={event.title} />
      )}
    </EventsDiv>
  </Container>

);
}

export default MyEvents;
