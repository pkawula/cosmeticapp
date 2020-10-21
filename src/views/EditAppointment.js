import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import PageTitle from 'components/atoms/PageTitle/PageTitle';
import AppointmentForm from 'components/organisms/AppointmentForm/AppoinmentForm';
import { useFirestore } from 'utils/utils';
import Spinner from 'components/atoms/Spinner/Spinner';

const Wrapper = styled.div`
  padding: 1em 0.5em 0 0.5em;
  border-radius: 1em 1em 0;
  background: ${({ theme }) => theme.light};
`;

const EditAppointment = ({
  history,
  match: {
    params: { id },
  },
}) => {
  const appointments = useFirestore('appointments');

  const [appointment, setAppointment] = useState({});

  useEffect(() => {
    setAppointment(...appointments.filter(({ ID }) => ID === id));
  }, [appointments, id]);

  return (
    <Wrapper>
      <PageTitle>Edit Appointment</PageTitle>
      {appointment ? (
        <AppointmentForm
          pickedServices={appointment.pickedServices}
          visitDate={appointment.visitDate}
          clientId={appointment.clientID}
          history={history}
          appointmentId={id}
          clientName={appointment.clientName}
        />
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

EditAppointment.propTypes = {
  history: propTypes.shape({
    goBack: propTypes.func.isRequired,
    length: propTypes.number.isRequired,
  }).isRequired,
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default EditAppointment;
