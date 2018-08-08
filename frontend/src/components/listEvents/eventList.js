import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../searchBar/';

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
      <ul>
        <SearchBar events={this.props.events} updateEvents = {this.updateEvents} />
        <div>
          {this.state.events.map(event =>
            <li key={event.id}><Link to={'/events/' + event.id}>{event.title}</Link></li>
          )}
        </div>
      </ul>
  );
  };
};

export default EventList;
