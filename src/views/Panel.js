import React from 'react';
import styled, { css } from 'styled-components';
import Card from 'components/molecules/Card/Card';
import Button from 'components/atoms/Button/Button';
import { Link } from 'react-router-dom';
import { routes } from 'routes';

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

const StyledButton = styled(Button)`
  text-decoration: none;
`;

const Panel = () => (
  <StyledContainer>
    <StyledPageName>Dashboard</StyledPageName>
    <Card cardTitle="Clients">
      <StyledButton as={Link} to={routes.clients} secondary>
        All clients
      </StyledButton>
      <StyledButton as={Link} to={routes.addClient}>
        Add client
      </StyledButton>
    </Card>
    <Card cardTitle="Appointments">
      <Button secondary>Manage appointments</Button>
      <Button secondary>Callendar</Button>
      <Button>New appointment</Button>
    </Card>
  </StyledContainer>
);

export default Panel;
