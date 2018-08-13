import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavDiv = styled.div`
  padding: 15px 35px;
  :hover {
    background: #BB785F
  }
  :active {
    background: #925d4A
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #FFFFFF
  display: inline-block;
  position: relative;
  z-index: 1;
  padding: 1em 4em;
  margin: -2em;
`;

const Navlink = props =>
  <NavDiv>
    <NavLink to={props.to}>{props.label}</NavLink>
  </NavDiv>;

export default Navlink;
