import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import SearchBar from '../searchBar/';
import EventTile from './eventTile';

const EventsDiv = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1240px;

  ::after {
  content: '';
  width: 350px;
  flex: auto;
}
`;

const StyledLabel = styled.label`
  font-size: 15px;
`;

const StyledSelect = styled.select`
  margin: 0 10px;
`;

class EventList extends React.Component {
  constructor (props) {
    super(props);
    props.events ? this.state = { events: props.events } : this.state = { events: [] };
    this.updateEvents = this.updateEvents.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ events: nextProps.events });
  }

  updateEvents(ids) {
    const visibleEvents = [];
    this.props.events.forEach((event) => {
      if (ids.includes(event.id.toString())) {
        visibleEvents.push(event);
      }
    });
    this.setState({ events: visibleEvents });
  }

  render() {
    return (
      <div>
        <SearchBar events={this.props.events} updateEvents = {this.updateEvents} />
        <br />
        <StyledLabel>
          Sort by
          <StyledSelect name='sort' onChange={ this.props.sortBy } >
            <option value='newest'> Newest </option>
            <option value='oldest'> Oldest </option>
            <option value='soonest'> Soonest </option>
          </StyledSelect>
        </StyledLabel>
        <EventsDiv>
          {this.state.events.map(event =>
            <EventTile to={'/events/' + event.id}
              key={event.id}
              title={event.title}
              date={event.date}
              time={event.time}
              location={event.location}/>
          )}
        </EventsDiv>
      </div>
  );
  };
};

export { EventsDiv };
export default EventList;
