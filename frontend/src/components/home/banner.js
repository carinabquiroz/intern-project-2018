import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledDiv = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: #FFF;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #FFF
  margin: 40px 30px 10px;
  width: 150px;
`;

const StyledButton = styled.div`
  background-color: #E49273;
  padding: 10px;
  border-radius: 5px;

  :hover {
    background: #BB785F
  }
`;

const NavDiv = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 15px 40px;
  :hover {
    background: #BB785F
  }
  :active {
    background: #925d4A
  }
`;


const Banner = () =>
  <StyledDiv>
    Explore Events
  </StyledDiv>;

const WelcomeBanner = () =>
  <StyledDiv>
    <div>
      {`Try new things. Meet new people.`}
    </div>
    <ButtonContainer>
      <StyledLink to='/login'>
        <StyledButton>Login</StyledButton>
      </StyledLink>
      <StyledLink to='/register'>
        <StyledButton>Register</StyledButton>
      </StyledLink>
    </ButtonContainer>
  </StyledDiv>;

export {Banner, WelcomeBanner};
