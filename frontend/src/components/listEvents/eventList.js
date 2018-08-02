import React from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledDiv = styled.div`
  text-align: center;
`;
const EventList = props =>
  <ul>
    <div>
      {props.events.map(event =>
        <li key={event.id}><Link to={'/events/' + event.id}>{event.title}</Link></li>
      )}
    </div>
  </ul>;

export default EventList;
