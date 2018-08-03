import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavDiv = styled.div`
  padding: 0 30px;
`;

const Navlink = props =>
  <NavDiv>
    <Link to={props.to}>{props.label}</Link>
  </NavDiv>;

export default Navlink;
