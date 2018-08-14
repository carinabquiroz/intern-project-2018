import React from 'react';
import styled from 'styled-components';

import { Banner, WelcomeBanner } from './banner';
import ListEvents from '../listEvents';

const Header = styled.div`
  background-color: #2B4570;
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Home = (props) => (
  <div>
    <Header>
      {props.loggedIn ? <Banner /> : <WelcomeBanner />}
    </Header>
    <ListEvents loggedIn={props.loggedIn} {...props} />
  </div>
);

export default Home;
