import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { ReactComponent as SortArrow } from 'images/icons/sort_arrow.svg';
import { connect } from 'react-redux';
import Calendar from 'components/organisms/Calendar/Calendar';
import PageTitle from 'components/atoms/PageTitle/PageTitle';
import Event from 'components/molecules/Event/Event';
import Button from 'components/atoms/Button/Button';
import { REMOVE_APPOINTMENT } from 'reducers/Appointments';
import { useFirestore } from 'utils/utils';
import { auth } from '../firebase';

const StyledWrapper = styled.section`
  width: 100%;
  padding: 1em 0.5em 0 0.5em;
  border-radius: 1em 1em 0;
  background: ${({ theme }) => theme.light};
`;

const StyledSectionTitle = styled.h3`
  width: 100%;
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

const SectionContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
`;

const Paragraph = styled.p`
  display: inline;
  margin-right: 0.25em;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-transform: uppercase;
`;

const StyledSortButton = styled(Button)`
  display: flex;
  flex-wrap: nowrap;
  padding: 0.5em;
  background-color: ${({ theme }) => theme.secondary};
  animation: none;
`;

const StyledSortArrow = styled(SortArrow)`
  display: inline;
  padding: 0;
  margin: ${({ reversed }) => (reversed ? '0 0 0 .25em' : '0 .25em 0 0')};

  path {
    fill: #f9f9f9;
    opacity: ${({ active }) => (active ? 1 : 0.5)};
    transition: opacity 0.3s ease-in-out;
  }

  ${({ reversed }) =>
    reversed &&
    css`
      transform: rotate(180deg);
    `}
`;

const SORT_DIRECTION = {
  ASC: 'asc',
  DESC: 'desc',
};

const CalendarView = ({ removeAppointment }) => {
  const clients = useFirestore('clients');
  const appointments = useFirestore('appointments');

  const today = new Date();

  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());

  const [sortDirection, setDirection] = useState(SORT_DIRECTION.ASC);

  const changeSortDirection = () => {
    if (sortDirection === SORT_DIRECTION.ASC) return setDirection(SORT_DIRECTION.DESC);
    return setDirection(SORT_DIRECTION.ASC);
  };

  const sortAppointments = (first, second, direction) => {
    const firstDate = new Date(first.visitDate).getTime();
    const secondDate = new Date(second.visitDate).getTime();

    if (direction === SORT_DIRECTION.ASC) return firstDate - secondDate;
    return secondDate - firstDate;
  };

  const filteredAppointments = appointments
    .filter(
      ({ visitDate }) =>
        new Date(visitDate.seconds * 1000).getMonth() === month &&
        new Date(visitDate.seconds * 1000).getDate() === day &&
        new Date(visitDate.seconds * 1000).getFullYear() === year,
    )
    .sort((firstItem, secondItem) => sortAppointments(firstItem, secondItem, sortDirection));

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
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

  const deleteVisit = data => {
    removeAppointment(auth.currentUser.uid, { ...data });
  };

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
      <SectionContainer>
        <Paragraph>Sort by date:</Paragraph>
        <StyledSortButton
          onClick={() => {
            changeSortDirection();
          }}
        >
          <StyledSortArrow active={sortDirection === SORT_DIRECTION.ASC ? 1 : 0} />
          <StyledSortArrow active={sortDirection === SORT_DIRECTION.DESC ? 1 : 0} reversed />
        </StyledSortButton>
      </SectionContainer>
      {filteredAppointments.length ? (
        <StyledEventsWrapper>
          {filteredAppointments.map(({ pickedServices, clientID: client, visitDate, ID }) => {
            if (!clients) return console.log('no clients');

            const time = new Date(visitDate.seconds * 1000);

            const currentClient = clients.find(({ clientID }) => clientID === client);

            return (
              <Event
                key={ID}
                visitID={ID}
                deleteVisit={() => deleteVisit({ pickedServices, clientID: client, visitDate, ID })}
                time={`${time.getHours()}:${time.getMinutes() === 0 ? '00' : time.getMinutes()}`}
                fullName={clients.length > 0 ? currentClient.name : ''}
                services={pickedServices}
              />
            );
          })}
        </StyledEventsWrapper>
      ) : (
        <StyledNoEventInfo>nothing planned.. get some rest :) </StyledNoEventInfo>
      )}
    </StyledWrapper>
  );
};

CalendarView.propTypes = {
  removeAppointment: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  removeAppointment: (userId, data) =>
    dispatch({ type: REMOVE_APPOINTMENT, userId, payload: { ...data } }),
});

export default connect(null, mapDispatchToProps)(CalendarView);
