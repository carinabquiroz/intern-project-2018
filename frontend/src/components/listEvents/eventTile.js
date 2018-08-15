import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Moment from 'moment';
import arrow from '../../resources/right-arrow.svg';

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-decoration: none;
  width: 300px;
  height: 150px;
  margin: 5px;
  background: linear-gradient(180deg, rgba(168, 208, 219, 1), rgba(168, 208, 219, .1));
  border-radius: 5px;
  :hover {
    box-shadow: 5px 5px 1px;
    color: #7180AC;
  }
  :active {
    box-shadow: 5px 5px 1px;
    color: #48536e;
  }
`;

const Bottom = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: flex-end;
`;

const ArrowDiv = styled.div`
  background-image: url(${arrow});
  width: 20px;
  height: 20px;
  margin: 15px 10px;
`;

const TitleDiv = styled.div`
  margin-bottom: 15px;
  padding-left: 20px;
  color: black;
  font-weight: bold;
  font-size: 20px;
`;

const Deets = styled.div`
  align-self: flex-end;
  text-align: right;
  margin: 15px 15px 0 0;
  color: #555555
`;

const EventTile = props => {
  const date = Moment(props.date, 'YYYY-MM-DD').format('MMMM Do')
  const time = Moment(props.time, 'HH:mm:ss').format('h:mm A')
  return (
    <StyledLink to={props.to}>
      <Deets>
        {date}
        <br />
        {time}
        <br />
        {props.location}
      </Deets>
      <Bottom>
        <TitleDiv>{props.title}</TitleDiv>
        <ArrowDiv />
      </Bottom>
    </StyledLink>
  )
}

export default EventTile;
