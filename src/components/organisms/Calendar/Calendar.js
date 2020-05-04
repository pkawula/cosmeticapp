import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as ArrowImage } from 'images/icons/arrow.svg';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';

const StyledWrapper = styled.div`
  display: block;
  margin: 2em auto;
  padding: 1em;
  width: 100%;
  max-width: 436px;
  box-shadow: 3px 3px 10px -3px hsla(0, 0%, 0%, 0.2);
`;

const StyledNavigationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledButtonIcon = styled(ButtonIcon)`
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

const StyledDateInfo = styled.div`
  display: block;
  margin: 0 0.9em;
`;

const StyledYear = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-transform: uppercase;
  text-align: center;
  margin: 0;
  line-height: 1;
`;

const StyledMonthName = styled.p`
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
`;

const StyledWeekNamesContainer = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  box-shadow: 3px 3px 10px -3px hsla(0, 0%, 0%, 0.2);
  padding: 0.5em;
  list-style: none;
  margin: 1em 0;
`;

const StyledWeekName = styled.li`
  display: block;
  width: 14.285%;
  height: auto;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-align: center;
  text-transform: uppercase;
`;

const StyledMonthDaysContainer = styled.ul`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  margin-top: 1em;
  list-style: none;
`;

const StyledDay = styled.li`
  display: block;
  width: 14.285%;
  max-width: 2.5em;
  height: 14.285%;
  line-height: 2.5em;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  text-align: center;
  text-transform: uppercase;
  border-radius: 50%;
  margin: 0.5em 3px;
  padding: 0;
  background: ${({ today }) => (today ? 'hsl(263, 45%, 56%)' : 'hsl(0, 0%, 94%)')};
  color: ${({ today, theme }) => (today ? theme.light : theme.black)};
  opacity: ${({ elseMonth }) => (elseMonth ? 0.5 : 1)};
  box-shadow: 3px 3px 10px -3px hsla(0, 0%, 0%, 0.2);
`;

const Calendar = () => {
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

  const today = new Date();
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));
  const [endDay, setEndDay] = useState(getEndDayOfMonth(date));
  const [daysInMonth, setDaysInMonth] = useState(getDaysOfMonth(date));

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfMonth(date));
    setEndDay(getEndDayOfMonth(date));
    setDaysInMonth(getDaysOfMonth(date));
  }, [date]);

  return (
    <StyledWrapper>
      <StyledNavigationContainer>
        <StyledButtonIcon onClick={() => setDate(new Date(year, month - 1, day))} left="true">
          <ArrowImage />
        </StyledButtonIcon>
        <StyledDateInfo>
          <StyledYear>{year}</StyledYear>
          <StyledMonthName>{months[month]}</StyledMonthName>
        </StyledDateInfo>
        <StyledButtonIcon onClick={() => setDate(new Date(year, month + 1, day))}>
          <ArrowImage />
        </StyledButtonIcon>
      </StyledNavigationContainer>
      <StyledCalendarContainer>
        <StyledWeekNamesContainer>
          <StyledWeekName>MON</StyledWeekName>
          <StyledWeekName>TUE</StyledWeekName>
          <StyledWeekName>WED</StyledWeekName>
          <StyledWeekName>THU</StyledWeekName>
          <StyledWeekName>FRI</StyledWeekName>
          <StyledWeekName>SAT</StyledWeekName>
          <StyledWeekName>SUN</StyledWeekName>
        </StyledWeekNamesContainer>
        <StyledMonthDaysContainer>
          {console.log(`Start day: ${startDay} (expected 5). End day: ${endDay} (expected 0)`)}
          {Array(daysInMonth + (startDay - 1) + (7 - endDay))
            .fill(null)
            .map((_, index) => {
              const d = index - (startDay - 2);

              return (
                <StyledDay
                  key={d}
                  today={d === today.getDate()}
                  elseMonth={d <= 0 || d > daysInMonth}
                >
                  {d <= 0 || d > daysInMonth ? new Date(year, month, d).getDate() : d}
                </StyledDay>
              );
            })}
        </StyledMonthDaysContainer>
      </StyledCalendarContainer>
    </StyledWrapper>
  );
};

export default Calendar;
