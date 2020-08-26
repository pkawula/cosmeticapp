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
  border-radius: 1em 1em 0;
  padding: 1em 0.5em 0 0.5em;
  background: ${({ theme }) => theme.light};
`;

const Panel = () => (
  <StyledContainer>
    <PageTitle>Dashboard</PageTitle>
    <Card cardTitle="Clients">
      <Button as={Link} to={routes.clients} secondary="true">
        All clients
      </Button>
      <Button as={Link} to={routes.addClient}>
        Add client
      </Button>
    </Card>
    <Card cardTitle="Appointments">
      <Button secondary="true">Manage appointments</Button>
      <Button as={Link} to={routes.calendar} secondary="true">
        Calendar
      </Button>
      <Button as={Link} to={routes.addAppointment}>
        New appointment
      </Button>
    </Card>
  </StyledContainer>
);

export default Panel;
