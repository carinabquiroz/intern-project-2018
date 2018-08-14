import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import DisplayTag from './displayTag';
import Moment from 'moment';
import {Submit} from '../createEvent/index'

class DisplayEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectLogin: false,
      redirectMyEvents: false,
      askDelete: false,
    };
    this.attendEvent = this.attendEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.unattendEvent = this.unattendEvent.bind(this);
    this.askDelete = this.askDelete.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
  }

  attendEvent() {
    if (this.props.loggedIn) {
      console.log('attending the event');
      fetch('/attendEvent', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-access-token': window.localStorage.getItem('token'),
        },
        body: JSON.stringify({ eventId: this.props.info.id }),
      })
        .then(res => {
          this.props.loadEvents()
        });
    } else {
      this.setState({ redirectLogin: true });
    }
  }

  askDelete() {
    this.setState({ askDelete: true })
  }

  deleteEvent() {
    fetch('/deleteEvent', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-access-token': window.localStorage.getItem('token'),
      },
      body: JSON.stringify({ eventId: this.props.info.id }),
    })
      .then(res => {
        console.log('event deleted')
        this.setState({ redirectMyEvents: true })
        this.props.loadEvents()
      })
  }

  cancelDelete() {
    this.setState({ askDelete: false })
  }

  unattendEvent() {
    fetch('/unattendEvent', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-access-token': window.localStorage.getItem('token'),
      },
      body: JSON.stringify({ eventId: this.props.info.id }),
    })
      .then(res => {
        console.log('event unattended')
        this.props.loadEvents()
      })
  }

  render() {
    const date = Moment(this.props.info.date, 'YYYY-MM-DD').format('MMMM Do, YYYY')
    const time = Moment(this.props.info.time, 'HH:mm:ss').format('h:mm A')
    return (
      <div>
      <TitleBar>
        <Title> {this.props.info.title} </Title>
        <AttendButton>
          {
            !this.props.isAttending && !this.props.isHosting &&
            <StyledSubmit onClick={this.attendEvent}>
              Attend
            </StyledSubmit>
          }
          {
            this.props.isHosting &&
            <div>
              {
                !this.state.askDelete &&
                <div>
                  <StyledSubmit onClick={this.askDelete}> Delete Event </StyledSubmit>
                </div>
              }
              {
                this.state.askDelete &&
                <div>
                  <div> Are you sure you want to delete this event? </div>
                  <div>
                    <StyledSubmit onClick={this.deleteEvent}> Yes </StyledSubmit>
                    <StyledSubmit onClick={this.cancelDelete}> No </StyledSubmit>
                  </div>
                </div>
              }
              <StyledSubmit onClick={this.props.editEvent}> Edit Event </StyledSubmit>
            </div>
          }
          {
            this.props.isAttending &&
            <div>
              <div> You are attending this event! </div>
              <StyledSubmit onClick={this.unattendEvent}> Cancel Attendance </StyledSubmit>
            </div>
          }

        </AttendButton>
      </TitleBar>
      <Container>
      <SideBar>
        <div> Hosted by {this.props.isHosting && 'you!' }
        {!this.props.isHosting && this.props.info.creator} </div>
        <br />
        <div>Date: {date}</div>
        <br />
        <div>Time: {time}</div>
        <br />
        <div>Where: {this.props.info.location}</div>
      </SideBar>
      <Body>
        <Details>
          Details:
          <br />
          <br />
          {this.props.info.description}
          <br />
          <br />
          Tags:
          <br />
          <br />
          <Tags> {this.props.info.tags.map(tag => <DisplayTag key={tag} name={tag} />) } </Tags>
          <br />
          <AttendButton>
            {
              !this.props.isAttending && !this.props.isHosting &&
              <StyledSubmit onClick={this.attendEvent}>
                Attend
              </StyledSubmit>
            }
            {
              this.props.isHosting &&
              <div>
                {
                  !this.state.askDelete &&
                  <div>
                    <StyledSubmit onClick={this.askDelete}> Delete Event </StyledSubmit>
                  </div>
                }
                {
                  this.state.askDelete &&
                  <div>
                    <div> Are you sure you want to delete this event? </div>
                    <div>
                      <StyledSubmit onClick={this.deleteEvent}> Yes </StyledSubmit>
                      <StyledSubmit onClick={this.cancelDelete}> No </StyledSubmit>
                    </div>
                  </div>
                }
                <StyledSubmit onClick={this.props.editEvent}> Edit Event </StyledSubmit>
              </div>
            }
            {
              this.props.isAttending &&
              <div>
                <div> You are attending this event! </div>
                <StyledSubmit onClick={this.unattendEvent}> Cancel Attendance </StyledSubmit>
              </div>
            }

          </AttendButton>
        </Details>
        {
          this.state.redirectLogin && <Redirect
          to={{
            pathname: '/login',
            state: { from: this.props.location },
          }}/>
        }
        {
          this.state.redirectMyEvents && <Redirect
          to={{pathname: '/events/myevents'}}/>
        }
      </Body>
      </Container>
      </div>
    )
  }
}

const Tags = styled.div`
  display: flex

`;

const Title = styled.div`
  font-size: 40px;
  margin-left: 15vw;
`;

const AttendButton = styled.div`
  margin-right: 15vw
  width: 22vw;
`;

const TitleBar = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 15vh;
  margin: 0;
  background: #2b4570
  color: #FFFFFF
  `;

const Body = styled.div`
  display: flex
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  width: 80vw
`
const Details = styled.div`
  margin: 3vw 5vw 10vw 15vw
  align-self: flex-start;
  white-space: pre-wrap
`;
const SideBar = styled.div`
  margin: 0 15vw 0 0;
  padding: 3vw
  text-align: left;
  height: 100vh;
  width: 20vw
  background: #7180AC
`;

const Container = styled.span`
  display: flex;
  width: 100vw;
  flex-direction: row-reverse;
  justify-content: space-between
`;

const StyledSubmit = styled(Submit)`
  margin: 3px;
  font-size: 15px
  border-radius: 3px;
`;

export default DisplayEvent;
