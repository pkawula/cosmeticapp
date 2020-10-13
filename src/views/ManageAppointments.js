import React from 'react';
import styled from 'styled-components';
import PageTitle from 'components/atoms/PageTitle/PageTitle';

const Wrapper = styled.div`
  width: 100%;
  border-radius: 1em 1em 0;
  padding: 0.9em;
  padding-top: 1em;
  background-color: ${({ theme }) => theme.light};
`;

const ManageAppointments = () => (
  <Wrapper>
    <PageTitle>Manage Appointments</PageTitle>
  </Wrapper>
);

export default ManageAppointments;
