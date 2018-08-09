import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import DisplayEvent from './displayEvent';
import EditEvent from './editEvent';

class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };

    this.editEvent = this.editEvent.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  editEvent() {
    this.setState({ isEditing: true })
  }

  cancelEdit() {
    this.setState({ isEditing: false })
  }

  render() {
    return (
      <div>
        { !this.state.isEditing && <DisplayEvent {...this.props} editEvent={this.editEvent} /> }
        { this.state.isEditing && <EditEvent {...this.props} cancelEdit={this.cancelEdit} /> }
      </div>
    );
  }
}

const NotFound  = () =>
  <div>
    uh oh! We could not find your event!
  </div>;

export { NotFound };

export default EventPage;
