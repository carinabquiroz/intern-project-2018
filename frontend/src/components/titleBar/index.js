import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Header = styled.h1`
  color: #2B4570;
  font-size: 50px;
  margin: 20px
`

const TitleBar =
  <StyledLink to='/'>
    <Header>MeetDown :)</Header>
  </StyledLink>;

export default TitleBar;
