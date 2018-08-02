
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import styled from 'styled-components';
import EventPage from '../eventPage/'
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
    console.log(this.state.events);
    return (
      <Router>
        <StyledDiv>
          <ul>
          <div>
            {this.state.events.map(event =>
              <li key={event.id}><Link to={"/event/"+event.id}>{event.title}</Link></li>
            )}
          </div>
          </ul>
          <hr />
          <div>
            {this.state.events.map(event =>
              <Route path={"/event/"+event.id} key={event.id} render={() => <EventPage info={event} />} />
            )}
          </div>
        </StyledDiv>
      </Router>
    );
  }
}

export default ListEvents;
