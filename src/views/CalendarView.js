import React from 'react';
import styled from 'styled-components';
import Calendar from 'components/organisms/Calendar/Calendar';
import PageTitle from 'components/atoms/PageTitle/PageTitle';
import Event from 'components/molecules/Event/Event';

const StyledWrapper = styled.section`
  width: 100%;
  margin-top: 2em;
`;

const StyledSectionTitle = styled.h3`
  width: 100vh;
  margin: 0.5em 0;
  padding: 1em;
  background: hsl(0, 0%, 94%);
  color: ${({ theme }) => theme.black};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.m};
  box-shadow: 0px 3px 10px -3px hsla(0, 0%, 0%, 0.2);
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
  return (
    <StyledWrapper>
      <PageTitle>Calendar</PageTitle>
      <Calendar />
      <StyledSectionTitle>Your day | 11th May</StyledSectionTitle>
      <StyledNoEventInfo>nothing planned.. get some rest :) </StyledNoEventInfo>
      <StyledEventsWrapper>
        <Event
          time="9:30"
          firstName="Piotr"
          lastName="Kawula"
          services={['manicure', 'pedicure']}
        />
        <Event
          time="11:30"
          firstName="Weronika"
          lastName="Żurecka"
          services={['manicure', 'henna', 'burger', 'fryty', 'picka', 'coca-cola']}
        />
      </StyledEventsWrapper>
    </StyledWrapper>
  );
};

export default CalendarView;
