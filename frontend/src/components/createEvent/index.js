import React, { Component } from 'react';
import styled from 'styled-components';

import TagInput from './tagInput';

const Container = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: column;
  width: 600px;
  margin: auto;
  margin-top: 40px;
`;

const Label = styled.label`
  display: flex;

`;

const Entry = styled.input`
  margin-left: 10px;
  height: 20px;
  flex-grow: 1;
  font-size: 15px;
  :focus {
    outline-color: #CBD0E0;
  }
`;

const Submit = styled.button`
  margin-top: 30px;
  align-self: center;
  font-size: 20px;
  border-radius: 5px;
  background-color: #CBD0E0;
  :hover {
    background-color: #a4aeca
  }
  :active {
    background-color: #7d8bb3
  }
  outline: none;
`;

const Submitted = styled.div`
  margin-top: 30px;
`;

const StyledText = styled.textarea`
  margin-left: 10px;
  height: 20px;
  flex-grow: 1;
  height: 50px;
  font-size: 15px;
  border-color: #DDDDDD
  :focus {
    outline-color: #CBD0E0;
  }
`;

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      tags: [],
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/createEvent', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-access-token': window.localStorage.getItem('token'),
      },
      body: JSON.stringify(this.state),
    })
      .then(res => {
        if ((200 <= res.status) && (res.status < 300)) {
          this.setState({
            title: '',
            description: '',
            date: '',
            time: '',
            location: '',
            tags: [],
            submitted: true,
          });
        }
      });
  }

  render() {
    return (
      <Container>
        <Label>
          {`Event Name`}:
          <Entry
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            autoComplete="off"/>
        </Label>
        <br />
        <Label>
          Description:
          <StyledText
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
            autoComplete="off" />
        </Label>
        <br />
        <Label>
          Date:
          <Entry
            type="date"
            name="date"
            value={this.state.date}
            onChange={this.handleChange}
            autoComplete="off" />
        </Label>
        <br />
        <Label>
          Time:
          <Entry
            type="time"
            name="time"
            value={this.state.time}
            onChange={this.handleChange}
            autoComplete="off" />
        </Label>
        <br />
        <Label>
          Location:
          <Entry
            type="text"
            name="location"
            value={this.state.location}
            onChange={this.handleChange}
            autoComplete="off" />
        </Label>
        <br />
        <TagInput
          name="tags"
          onTagChange={this.handleChange}
          tags={this.state.tags} />
        <Submit onClick={this.handleSubmit}>Create Event</Submit>
        {this.state.submitted && <Submitted>{`You're event has been submitted!`}</Submitted>}
      </Container>
    );
  }
};

export { Container, Label, Entry, Submit, StyledText, Submitted };
export default CreateEvent;
