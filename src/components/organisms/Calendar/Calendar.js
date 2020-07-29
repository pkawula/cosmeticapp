import React, { useState, useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';
import propTypes from 'prop-types';
import { ReactComponent as ArrowImage } from 'images/icons/arrow.svg';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';

import { AppointmentsContext } from 'contexts/Appointments';

const StyledWrapper = styled.div`
  display: block;
  padding: 0;
  margin: 0 auto;
  width: 100%;
  max-width: 436px;
  min-width: 320px;
  box-shadow: 3px 3px 10px -3px hsla(0, 0%, 0%, 0.2);
  position: relative;
  background: #f0f0f0;
`;

export const StyledNavigationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledButtonIcon = styled(ButtonIcon)`
  display: block;
  height: 5em;
  width: 5em;
  padding: 0.9em;

  &svg {
    margin: auto;
  }

  ${({ left }) =>
    left &&
    css`
      transform: rotate(-180deg);
    `};
`;

export const StyledDateInfo = styled.div`
  display: block;
  margin: 0 0.5em;
  cursor: pointer;
`;

export const StyledYear = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-transform: uppercase;
  text-align: center;
  margin: 0;
  line-height: 1;
`;

export const StyledMonthName = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 3px;
  line-height: 1;
`;

const StyledCalendarContainer = styled.div`
  display: block;
  width: 100%;
  margin: 0 auto;
  ${({ modalOpened }) =>
    modalOpened &&
    css`
       {
        opacity: 0.3;
      }
    `}
`;

const StyledWeekNamesContainer = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  background: #f0f0f0;
  box-shadow: 3px 3px 10px -3px hsla(0, 0%, 0%, 0.2);
  padding: 0.5em;
  list-style: none;
  margin: 1em 0;
`;

const StyledWeekName = styled.li`
  display: block;
  flex-basis: 13%;
  margin: 0 auto;
  max-width: 2em;
  height: auto;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-align: center;
  text-transform: uppercase;
`;

const StyledMonthDaysContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 3px;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 0 0.5em;
  margin-top: 1em;
  list-style: none;
`;

const StyledDay = styled.li`
  display: block;
  width: 100%;
  max-width: 2em;
  height: 2em;
  line-height: 2em;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  text-align: center;
  text-transform: uppercase;
  border-radius: 50%;
  margin: 0.5em auto;
  padding: 0;
  background: ${({ today }) => (today ? 'hsl(263, 45%, 56%)' : 'hsl(0, 0%, 94%)')};
  color: ${({ today, theme }) => (today ? theme.light : theme.black)};
  opacity: ${({ elseMonth }) => (elseMonth ? 0.5 : 1)};
  box-shadow: 3px 3px 10px -3px hsla(0, 0%, 0%, 0.2);
  position: relative;
  cursor: pointer;

  ${({ isReserved }) =>
    isReserved > 0 &&
    css`
      &::before {
        content: '';
        width: 1.2em;
        height: 1.2em;
        position: absolute;
        bottom: -0.2em;
        left: -0.2em;
        background-color: ${({ theme }) => theme.secondary};
        border-radius: 50%;
      }

      &::after {
        content: '${isReserved}';
        width: 1.2em;
        height: 1.2em;
        line-height: 1.2em;
        font-size: ${({ theme }) => theme.fontSize.s};
        font-weight: ${({ theme }) => theme.fontWeight.semiBold};
        color: ${({ theme }) => theme.light};
        position: absolute;
        bottom: -0.2em;
        left: -0.2em;
        z-index: 1;
      }
    `};
`;

const StyledItem = styled.li`
  flex-basis: 30%;
  display: block;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  margin-top: 0.5em;
  padding: 0.5em;
  border-radius: 0.5em;
  text-align: center;
  background: ${({ today }) => (today ? 'hsl(263, 45%, 56%)' : 'hsl(0, 0%, 94%)')};
  color: ${({ theme, today }) => (today ? theme.light : theme.black)};
  box-shadow: 3px 3px 10px -3px hsla(0, 0%, 0%, 0.2);
  cursor: pointer;
`;

const StyledInnerWrapper = styled.ul`
  width: 100%;
  padding: 1em;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  margin: 0;
`;

const Calendar = ({ optDate, changeDate, toggleModal }) => {
  const { appointments } = useContext(AppointmentsContext);

  const getStartDayOfMonth = currentDate => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  };

  const getEndDayOfMonth = currentDate => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDay();
  };

  const getDaysOfMonth = currentMonth => {
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
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

  const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  const calendarTypes = ['days', 'months', 'years'];

  const today = optDate || new Date();
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));
  const [endDay, setEndDay] = useState(getEndDayOfMonth(date));
  const [daysInMonth, setDaysInMonth] = useState(getDaysOfMonth(date));
  const [count, setCount] = useState(0);

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfMonth(date));
    setEndDay(getEndDayOfMonth(date));
    setDaysInMonth(getDaysOfMonth(date));
  }, [date]);

  const countClick = action => {
    if (count > 2) return setCount(2);
    if (count < 0) return setCount(0);
    if (action === 'increment') {
      if (count === 2) return setCount(2);
      setCount(count + 1);
    }
    if (action === 'decrement') {
      if (count === 0) return setCount(0);
      setCount(count - 1);
    }
    return new Error('You have to define action!');
  };

  const chosenType = type => {
    if (type === 0) return Array(daysInMonth + (startDay - 1) + (7 - endDay)).fill(null);
    if (type === 2) return Array(10).fill(null);
    return months;
  };

  const handleArrowDateChange = (dir, clicksCount) => {
    const decYear = calendarTypes[clicksCount] === 'years' ? year - 10 : year;
    const decMonth = calendarTypes[clicksCount] !== 'years' ? month - 1 : month;
    const incYear = calendarTypes[clicksCount] === 'years' ? year + 10 : year;
    const incMonth = calendarTypes[clicksCount] !== 'years' ? month + 1 : month;

    if (dir === 'decrement') return setDate(new Date(decYear, decMonth, day));
    if (dir === 'increment') return setDate(new Date(incYear, incMonth, day));

    return new Error('Please check if all arguments were given');
  };

  const checkIfPlannedVisit = dateToCheck => {
    const dayToCheck = dateToCheck.getDate();
    const monthToCheck = dateToCheck.getMonth();

    return appointments.filter(
      ({ visitDate }) =>
        new Date(visitDate).getDate() === dayToCheck &&
        new Date(visitDate).getMonth() === monthToCheck,
    ).length;
  };

  return (
    <StyledWrapper>
      <StyledNavigationContainer>
        <StyledButtonIcon onClick={() => handleArrowDateChange('decrement', count)} left="true">
          <ArrowImage />
        </StyledButtonIcon>
        <StyledDateInfo onClick={() => countClick('increment')}>
          <StyledYear>{year}</StyledYear>
          <StyledMonthName>{months[month]}</StyledMonthName>
        </StyledDateInfo>
        <StyledButtonIcon onClick={() => handleArrowDateChange('increment', count)}>
          <ArrowImage />
        </StyledButtonIcon>
      </StyledNavigationContainer>
      {calendarTypes[count] === 'days' ? (
        <StyledCalendarContainer>
          <StyledWeekNamesContainer>
            {weekDays.map(weekDay => (
              <StyledWeekName key={weekDay}>{weekDay}</StyledWeekName>
            ))}
          </StyledWeekNamesContainer>
          <StyledMonthDaysContainer>
            {chosenType(0).map((name, index) => {
              const currentDay = index - (startDay - 2);

              return (
                <StyledDay
                  key={currentDay}
                  today={currentDay === day}
                  isReserved={checkIfPlannedVisit(new Date(year, month, currentDay))}
                  elseMonth={currentDay <= 0 || currentDay > daysInMonth}
                  onClick={() => {
                    setDate(new Date(year, month, currentDay));
                    if (optDate) {
                      changeDate(new Date(year, month, currentDay, 8, 0));
                    }
                    if (toggleModal) setTimeout(() => toggleModal(), 200);
                  }}
                >
                  {currentDay <= 0 || currentDay > daysInMonth
                    ? new Date(year, month, currentDay).getDate()
                    : currentDay}
                </StyledDay>
              );
            })}
          </StyledMonthDaysContainer>
        </StyledCalendarContainer>
      ) : (
        <StyledInnerWrapper>
          {chosenType(count).map((_, index) => {
            const itemToDisplay = () => {
              if (calendarTypes[count] === 'months') return months[index];
              return year + index;
            };

            return (
              <StyledItem
                key={itemToDisplay() === year + index ? itemToDisplay() : months[index]}
                today={
                  itemToDisplay() === year + index
                    ? itemToDisplay() === year
                    : itemToDisplay() === months[month]
                }
                onClick={() => {
                  setDate(
                    itemToDisplay() === year + index
                      ? new Date(itemToDisplay(), month, day)
                      : new Date(year, index, day),
                  );
                  if (optDate) {
                    changeDate(
                      itemToDisplay() === year + index
                        ? new Date(itemToDisplay(), month, day, 8, 0)
                        : new Date(year, index, day, 8, 0),
                    );
                  }
                  countClick('decrement');
                }}
              >
                {itemToDisplay() === year + index ? itemToDisplay() : months[index]}
              </StyledItem>
            );
          })}
        </StyledInnerWrapper>
      )}
    </StyledWrapper>
  );
};

Calendar.propTypes = {
  optDate: propTypes.objectOf(propTypes.object),
  changeDate: propTypes.func,
  toggleModal: propTypes.func,
};

Calendar.defaultProps = {
  optDate: null,
  changeDate: null,
  toggleModal: null,
};

export default Calendar;
