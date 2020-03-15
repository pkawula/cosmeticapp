import React from 'react';
import styled from 'styled-components';
import LogoIcon from 'images/logo.svg';
import { Link } from 'react-router-dom';
import { routes } from 'routes';

const StyledLink = styled(Link)`
  margin: 0;
  padding: 0;
  display: flex;
  justify-items: center;
  justify-content: center;
`;

const StyledImg = styled.img`
  width: 100%;
  max-width: 200px;
  display: inline-block;
  margin: auto;
  padding: 0.5em 1em;
`;

const Logo = () => (
  <StyledLink to={routes.home}>
    <StyledImg src={LogoIcon} alt="Logo" />
  </StyledLink>
);

export default Logo;
