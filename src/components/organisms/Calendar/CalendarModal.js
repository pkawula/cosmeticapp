import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as ArrowImage } from 'images/icons/arrow.svg';
import {
  StyledNavigationContainer,
  StyledButtonIcon,
  StyledDateInfo,
  StyledYear,
  StyledMonthName,
} from './Calendar';

const StyledWrapper = styled.div`
  display: block;
  width: 100%;
  min-width: 436px;
  animation: FadeInDown 0.3s 1 cubic-bezier(0, 0, 0.5, 2);
  border-radius: 0.5em;
  background: ${({ theme }) => theme.light};
  box-shadow: 3px 3px 10px -3px hsla(0, 0%, 0%, 0.2);

  @keyframes FadeInDown {
    from {
      transform: translateY(-3em);
    }
    to {
      transform: translateY(0);
    }
  }
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

const StyledItem = styled.li`
  flex-basis: 30%;
  display: block;
  margin-top: 0.5em;
  padding: 0.5em;
  border-radius: 0.5em;
  text-align: center;
  background: ${({ today }) => (today ? 'hsl(263, 45%, 56%)' : 'hsl(0, 0%, 94%)')};
  color: ${({ theme, today }) => (today ? theme.light : theme.black)};
  box-shadow: 3px 3px 10px -3px hsla(0, 0%, 0%, 0.2);
  cursor: pointer;
`;

const CalendarModal = ({ months, date, toggleModal, toggleMonth, year, setYear }) => {
  const [choosingYear, setYearChoosing] = useState(false);

  const toggleYear = () => setYearChoosing(!choosingYear);

  return (
    <StyledWrapper>
      <StyledNavigationContainer>
        <StyledButtonIcon left="true">
          <ArrowImage />
        </StyledButtonIcon>
        <StyledDateInfo onClick={() => toggleYear()}>
          <StyledYear>{year}</StyledYear>
          <StyledMonthName>{months[date.getMonth()]}</StyledMonthName>
        </StyledDateInfo>
        <StyledButtonIcon>
          <ArrowImage />
        </StyledButtonIcon>
      </StyledNavigationContainer>
      {/* things which left: add functions to arrows (change years or decades) + add functionality to close modal when clicking outside */}
      {choosingYear ? (
        <StyledInnerWrapper>
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <StyledItem
                today={year + index === year}
                onClick={() => {
                  setYear(year + index);
                  toggleYear();
                }}
                key={year + index}
              >
                {year + index}
              </StyledItem>
            ))}
        </StyledInnerWrapper>
      ) : (
        <StyledInnerWrapper>
          {months.map((month, index) => (
            <StyledItem
              onClick={
                months[date.getMonth()] === month
                  ? () => toggleModal()
                  : () => {
                      toggleMonth(index);
                      toggleModal();
                    }
              }
              key={months[index]}
              today={months[date.getMonth()] === month}
            >
              {month}
            </StyledItem>
          ))}
        </StyledInnerWrapper>
      )}
    </StyledWrapper>
  );
};

export default CalendarModal;
