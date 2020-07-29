import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Calendar from 'components/organisms/Calendar/Calendar';
import PageTitle from 'components/atoms/PageTitle/PageTitle';
import Event from 'components/molecules/Event/Event';
import { ClientsContext } from 'contexts/Clients';
import { AppointmentsContext } from 'contexts/Appointments';

const StyledWrapper = styled.section`
  width: 100%;
  padding: 0 0.5em;
`;

const StyledSectionTitle = styled.h3`
  width: 100vw;
  margin: 0.5em 0;
  padding: 1em;
  background: hsl(0, 0%, 94%);
  color: ${({ theme }) => theme.black};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.m};
  box-shadow: 0px 3px 10px -3px hsla(0, 0%, 0%, 0.2);
`;

const StyledCurrentDay = styled.span`
  display: inline;
  text-transform: uppercase;
  color: ${({ theme }) => theme.secondary};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.m};
`;

const StyledNoEventInfo = styled.p`
  display: block;
  max-width: 300px;
  margin: 1em auto;
  padding: 1em;
  background: hsl(0, 0%, 94%);
  border-radius: 10px;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  text-align: center;
  box-shadow: 3px 3px 10px -3px hsla(0, 0%, 0%, 0.2);
`;

const StyledEventsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const CalendarView = () => {
  const { clients } = useContext(ClientsContext);
  const { appointments } = useContext(AppointmentsContext);

  const today = new Date();

  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
  }, [date]);

  const changeDate = e => setDate(e);

  const formatDay = dayNumber => {
    if (dayNumber === 1) return `${dayNumber}st`;
    if (dayNumber === 2) return `${dayNumber}nd`;
    if (dayNumber === 3) return `${dayNumber}rd`;
    if (dayNumber === 21) return `${dayNumber}st`;
    if (dayNumber === 22) return `${dayNumber}nd`;
    if (dayNumber === 23) return `${dayNumber}rd`;
    if (dayNumber === 31) return `${dayNumber}st`;
    return `${dayNumber}th`;
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <StyledWrapper>
      <PageTitle>Calendar</PageTitle>
      <Calendar changeDate={changeDate} optDate={today} />
      <StyledSectionTitle>
        Plans on{' '}
        <StyledCurrentDay>
          {formatDay(day)} {months[month]}
        </StyledCurrentDay>
      </StyledSectionTitle>
      <StyledNoEventInfo>nothing planned.. get some rest :) </StyledNoEventInfo>
      <StyledEventsWrapper>
        {appointments
          .filter(
            ({ visitDate }) =>
              new Date(visitDate).getMonth() === month && new Date(visitDate).getDate() === day,
          )
          .map(({ pickedServices, clientID: client, visitDate }) => (
            <Event
              key={clients.find(({ clientID }) => clientID === client).name}
              time={`${new Date(visitDate).getHours()}:${
                new Date(visitDate).getMinutes() === 0 ? '00' : new Date(visitDate).getMinutes()
              }`}
              fullName={clients.find(({ clientID }) => clientID === client).name}
              services={pickedServices}
            />
          ))}
      </StyledEventsWrapper>
    </StyledWrapper>
  );
};

export default CalendarView;
