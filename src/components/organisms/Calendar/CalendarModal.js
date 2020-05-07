import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
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

const CalendarModal = ({
  months,
  currentMonth,
  currentYear,
  setYear,
  toggleMonth,
  toggleModal,
}) => {
  const [choosingYear, setYearChoosing] = useState(false);
  const [decade, setDecade] = useState(currentYear);

  const modalRef = useRef(null);

  useEffect(() => {
    setDecade(currentYear);
  }, [currentYear]);

  const useModalRef = ref => {
    useEffect(() => {
      const handleClickOutside = e => {
        if (ref.current && !ref.current.contains(e.target)) {
          toggleModal();
        }
      };

      document.addEventListener('mousedown', e => handleClickOutside(e));
      return () => document.removeEventListener('mousedown', e => handleClickOutside(e));
    }, [ref]);
  };

  const toggleYear = () => setYearChoosing(!choosingYear);

  const prevDecade = () => setDecade(decade - 10);
  const nextDecade = () => setDecade(decade + 10);

  useModalRef(modalRef);

  return (
    <StyledWrapper ref={modalRef}>
      <StyledNavigationContainer>
        <StyledButtonIcon
          onClick={() => (choosingYear ? prevDecade() : setYear(decade - 1))}
          left="true"
        >
          <ArrowImage />
        </StyledButtonIcon>
        <StyledDateInfo onClick={() => toggleYear()}>
          <StyledYear>{decade}</StyledYear>
          <StyledMonthName>{months[currentMonth]}</StyledMonthName>
        </StyledDateInfo>
        <StyledButtonIcon onClick={() => (choosingYear ? nextDecade() : setYear(decade + 1))}>
          <ArrowImage />
        </StyledButtonIcon>
      </StyledNavigationContainer>
      {choosingYear ? (
        <StyledInnerWrapper>
          {Array(10)
            .fill(null)
            .map((_, index) => {
              const year = decade + index;
              return (
                <StyledItem
                  today={decade === year}
                  onClick={() => {
                    setYear(year);
                    toggleYear();
                  }}
                  key={year}
                >
                  {year}
                </StyledItem>
              );
            })}
        </StyledInnerWrapper>
      ) : (
        <StyledInnerWrapper>
          {months.map((month, index) => (
            <StyledItem
              onClick={
                months[currentMonth] === month
                  ? () => toggleModal()
                  : () => {
                      toggleMonth(index);
                      toggleModal();
                    }
              }
              key={months[index]}
              today={months[currentMonth] === month}
            >
              {month}
            </StyledItem>
          ))}
        </StyledInnerWrapper>
      )}
    </StyledWrapper>
  );
};

CalendarModal.propTypes = {
  months: propTypes.objectOf(propTypes.string).isRequired,
  toggleModal: propTypes.func.isRequired,
  toggleMonth: propTypes.func.isRequired,
  currentYear: propTypes.number.isRequired,
  setYear: propTypes.func.isRequired,
  currentMonth: propTypes.number.isRequired,
};

export default CalendarModal;
