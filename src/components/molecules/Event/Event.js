import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

const EventWrapper = styled.div`
  margin: 1em;
  padding: 0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
`;

const InnerContainer = styled.div`
  padding: 0.5em;
  background: hsl(0, 0%, 94%);
  border-radius: 10px;
  box-shadow: 3px 3px 10px -3px hsla(0, 0%, 0%, 0.2);

  &:first-of-type {
    margin-right: 0.5em;
  }

  &:last-of-type {
    margin-left: 0.5em;
  }
`;

const TimeText = styled.span`
  width: 100%;
  display: block;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bolder};
  color: ${({ theme }) => theme.black};
  text-align: center;
  line-height: 1;
  margin: 0;
  margin-bottom: 0.5em;
`;

const ClientName = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.black};
  margin: 0;
  text-align: center;
`;

const ServicesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
`;

const Service = styled.p`
  display: inline-block;
  padding: 0.5em;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  color: ${({ theme }) => theme.light};
  background: ${({ theme }) => theme.secondary};
  border-radius: 10px;
  margin: 0.5em 3px;
`;

const Event = ({ time, firstName, lastName, services }) => {
  const fullName = `${firstName} ${lastName}`;

  return (
    <EventWrapper>
      <InnerContainer>
        <TimeText>{time}</TimeText>
      </InnerContainer>
      <InnerContainer>
        <ClientName>{fullName}</ClientName>
        <ServicesContainer>
          {services.map(service => (
            <Service key={service}>{service}</Service>
          ))}
        </ServicesContainer>
      </InnerContainer>
    </EventWrapper>
  );
};

Event.propTypes = {
  time: propTypes.string.isRequired,
  firstName: propTypes.string.isRequired,
  lastName: propTypes.string.isRequired,
  services: propTypes.arrayOf(propTypes.string).isRequired,
};

export default Event;
