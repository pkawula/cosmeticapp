import React from 'react';
import styled from 'styled-components';
import Button from 'components/atoms/Button/Button';
import PageTitle from 'components/atoms/PageTitle/PageTitle';
import Card from 'components/molecules/Card/Card';
import { Link } from 'react-router-dom';
import { routes } from 'routes';

const StyledContainer = styled.div`
  width: 100%;
  margin: 0;
  padding: 0 0.5em;
`;

const Panel = () => (
  <StyledContainer>
    <PageTitle>Dashboard</PageTitle>
    <Card cardTitle="Clients">
      <Button as={Link} to={routes.clients} secondary>
        All clients
      </Button>
      <Button as={Link} to={routes.addClient}>
        Add client
      </Button>
    </Card>
    <Card cardTitle="Appointments">
      <Button secondary>Manage appointments</Button>
      <Button secondary>Callendar</Button>
      <Button>New appointment</Button>
    </Card>
  </StyledContainer>
);

export default Panel;
