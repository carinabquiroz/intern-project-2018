import React from 'react';
import styled from 'styled-components';

import Navlink from './navlink';

const NavContainer = styled.header`

  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  align-items: center;
  background: #E49273;
`;

const ConditionalLinks = styled.div`
  display: flex;
  flex-direction: row;
`;

const Navbar = props =>
  <NavContainer>
    <Navlink to='/' label='Home' />
    {/*<Navlink to='/events' label='Events' />*/}
    {props.loggedIn ?
      <ConditionalLinks>
        <Navlink to='/events/myevents' label='My Events' />
        <Navlink to='/createEvent' label='Create Event' />
        <div onClick={props.logout}>
          <Navlink to='/' label='Logout' onClick={props.logout} />
        </div>
      </ConditionalLinks>  :
      <ConditionalLinks>
        <Navlink to='/register' label='Register' />
        <Navlink to='/login' label='Login' />
      </ConditionalLinks>
    }
  </NavContainer>;

export default Navbar;
