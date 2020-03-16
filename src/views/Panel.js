import React from 'react';
import styled, { css } from 'styled-components';
import Card from 'components/molecules/Card/Card';

const StyledContainer = styled.div`
  width: 100%;
  margin: 0;
  padding: 0 0.5em;
`;

const StyledPageName = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.fontSize.xs};
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.black};
    text-transform: uppercase;
    margin: 0.5em 0;
  `}
`;

const Panel = () => (
  <StyledContainer>
    <StyledPageName>Dashboard</StyledPageName>
    <Card items={{ clients: ['all clients', 'add new'] }} />
    <Card />
  </StyledContainer>
);

export default Panel;
