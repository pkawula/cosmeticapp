import React, { useContext } from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import PageTitle from 'components/atoms/PageTitle/PageTitle';
import AppointmentForm from 'components/organisms/AppointmentForm/AppoinmentForm';
import { AppointmentsContext } from 'contexts/Appointments';
import { ClientsContext } from 'contexts/Clients';

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
  const { appointments } = useContext(AppointmentsContext);
  const { clients } = useContext(ClientsContext);

  const appointmentToEdit = appointments.filter(({ ID }) => ID === id);

  const { pickedServices, visitDate } = appointmentToEdit[0];

  const clientId = appointmentToEdit[0].clientID;
  const { name } = clients.filter(({ clientID }) => clientID === clientId)[0];

  return (
    <Wrapper>
      <PageTitle>Edit Appointment</PageTitle>
      <AppointmentForm
        pickedServices={pickedServices}
        visitDate={visitDate}
        clientName={name}
        clientId={clientId}
        history={history}
        appointmentId={id}
      />
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