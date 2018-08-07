
import React, { Component } from 'react';
import {
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import styled from 'styled-components';
import EventPage, { NotFound } from './eventPage';
import EventList from './eventList';
import MyEvents from './myevents';
import ProtectedRoute from '../protectedRoute';

const StyledDiv = styled.div`
  text-align: center;
`;

class ListEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      hosting: [],
      attending: [],
    };
  }

  componentDidMount() {
    fetch('/events',{
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-access-token': window.localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(json => this.setState({
        events: json.events,
        hosting: json.hosting,
        attending: json.attending
      }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <StyledDiv>
        <Link to='/events/myevents'>My Events</Link>
        <Switch>
          {this.state.events.map(event =>
            <Route
                path={'/events/' + event.id}
                key={event.id}
                render={() =>
                  <EventPage
                  info={event}
                  loggedIn={this.props.loggedIn}
                  {...this.props}
                  />}
            />
          )}
          <ProtectedRoute
            path='/events/myevents'
            component={MyEvents}
            loggedIn={ this.props.loggedIn }
            componentProps={{
              hostingIds: this.state.hosting,
              attendingIds: this.state.attending,
              events: this.state.events,
            }} />
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
