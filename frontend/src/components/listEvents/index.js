
import React, { Component } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import styled from 'styled-components';
import EventPage, { NotFound } from '../eventPage/';
import EventList from './eventList';

const StyledDiv = styled.div`
  text-align: center;
`;

class ListEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    fetch('/events')
      .then(res => res.json())
      .then(events => this.setState({ events }));
  }

  render() {
    return (
      <StyledDiv>
        <Switch>
          {this.state.events.map(event =>
            <Route
                path={'/events/' + event.id}
                key={event.id}
                render={() => <EventPage info={event} />}
            />
          )}
          <Route
            exact path='/events'
            render={() => <EventList events={this.state.events} />}
          />
          <Route path='/events/*' component = {NotFound} />
        </Switch>
      </StyledDiv>
    );
  }
}

export default ListEvents;
