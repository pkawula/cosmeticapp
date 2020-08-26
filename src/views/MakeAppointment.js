import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import PageTitle from 'components/atoms/PageTitle/PageTitle';
import AppoinmentForm from 'components/organisms/AppointmentForm/AppoinmentForm';

const Wrapper = styled.div`
  display: block;
  border-radius: 1em 1em 0;
  padding: 1em 0.5em 0 0.5em;
  background: ${({ theme }) => theme.light};
`;

const MakeAppointment = ({ history }) => (
  <Wrapper>
    <PageTitle>Make new appointment</PageTitle>
    <AppoinmentForm history={history} />
  </Wrapper>
);

MakeAppointment.propTypes = {
  history: propTypes.shape({
    goBack: propTypes.func.isRequired,
    length: propTypes.number.isRequired,
  }).isRequired,
};

export default MakeAppointment;
