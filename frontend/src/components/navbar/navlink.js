import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';



const NavLink = styled(Link)`
  text-decoration: none;
  font-size: 20px;
  font-weight: bold;
  padding: 15px 40px;
  :hover {
    background: #BB785F
  }
  :active {
    background: #925d4A
  }
  color: #FFFFFF
  display: inline-block;
  position: relative;
  z-index: 1;
`;

const Navlink = props =>
  <div>
    <NavLink to={props.to}>{props.label}</NavLink>
  </div>;

export default Navlink;
