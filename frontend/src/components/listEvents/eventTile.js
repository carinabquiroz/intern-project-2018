import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import arrow from '../../resources/right-arrow.svg';

const StyledLink = styled(Link)`
  display: flex;
  align-items: right;
  justify-content: space-between;
  text-decoration: none;
  width: 300px;
  height: 150px;
  margin: 5px;
  background: linear-gradient(30deg, rgba(168, 208, 219, 1), rgba(168, 208, 219, .2));
  border-radius: 5px;

  :hover {
    box-shadow: 5px 5px 1px;
    color: #7180AC;

  }
`;

const ArrowDiv = styled.div`
  background-image: url(${arrow});
  width: 20px;
  height: 20px;
  align-self: flex-end;
  margin: 0 20px 10px 0;
`;

const TitleDiv = styled.div`
  margin-top: auto;
  margin-bottom: 20px;
  padding-left: 10px;
  color: black;
  font-weight: bold;
  font-size: 20px;
`;

const EventTile = props =>
  <StyledLink to={props.to}>
      <TitleDiv>{props.title}</TitleDiv>
      <ArrowDiv />
  </StyledLink>;

export default EventTile;