import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import propTypes from 'prop-types';
import PageTitle from 'components/atoms/PageTitle/PageTitle';
import { ReactComponent as MagnifierIcon } from 'images/icons/search.svg';
import { ReactComponent as PersonIcon } from 'images/person.svg';
import InputField from 'components/atoms/InputField/InputField';
import Button from 'components/atoms/Button/Button';

const Wrapper = styled.div`
  display: block;
  padding: 0.5em;
  margin: 0;
`;

const Section = styled.section`
  display: block;
  width: 100%;
`;

const SectionTitle = styled.h2`
  display: inline-block;
  padding: 0.2em 0.5em;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  color: ${({ theme }) => theme.light};
  background: #ff6f91;
`;

const SearchWrapper = styled.label`
  display: block;
  width: 100%;
  padding: 0 0.5em;
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  position: relative;
`;

const InputSearchField = styled(InputField)`
  display: block;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.m};

  & ~ span {
    top: 50%;
    transform: translate(0.5em, -50%);
  }

  &:focus ~ span,
  &:active ~ span,
  &:not([value='']) ~ span {
    transform: translate(0, -225%);
  }
`;

const StyledMagnifierIcon = styled(MagnifierIcon)`
  position: absolute;
  top: 50%;
  right: 1em;
  transform: translateY(-50%);
  max-width: ${({ theme }) => theme.fontSize.m};
  max-height: ${({ theme }) => theme.fontSize.m};
`;

const SearchResults = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  margin: 0;
  padding: 0;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 1em);
  height: auto;
  overflow-y: auto;
  list-style: none;
  background: ${({ theme }) => theme.light};
  border: none;
  border-bottom-right-radius: 0.5em;
  border-bottom-left-radius: 0.5em;
  z-index: 2;
  box-shadow: 2px 5px 10px -1px hsla(0, 0%, 0%, 0.2);

  transition: max-height 0.3s ease-in-out;

  ${({ isEmpty }) =>
    isEmpty
      ? css`
          max-height: 0;
        `
      : css`
          max-height: 200px;
        `};
`;

const Result = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 0.5em 1em;
  margin: 0;
  transition: opacity 0.2s ease;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.black};

  &:hover {
    opacity: 0.75;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const StyledPersonIcon = styled(PersonIcon)`
  display: inline-block;
  width: 2em;
  height: 2em;
  margin-right: 0.5em;
  border-radius: 50%;
`;

const StyledPersonImage = styled.img`
  display: inline-block;
  width: 2em;
  height: 2em;
  margin-right: 0.5em;
  border-radius: 50%;
  object-fit: cover;
`;

const PersonName = styled.span`
  display: inline-block;
  text-align: left;
  margin-left: 0.5em;
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.black};
`;

const StyledButton = styled(Button)`
  display: block;
`;

const ServicesContainer = styled.div`
  min-width: 100%;
  display: block;
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 0.5em;
`;

const Service = styled.button`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSize.s};
  width: 4em;
  height: 4em;
  margin: 0.5em;
  padding: 0.5em;
  border: 2px dotted ${({ theme }) => theme.black};
  position: relative;
  cursor: pointer;

  ${({ image }) =>
    image
      ? css`
          background-image: url(${image});
          background-position: center;
          background-size: cover;
        `
      : css`
          background: hsl(0, 0%, 94%);
          &::before {
            content: '+';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            line-height: 1;
            font-size: ${({ theme }) => theme.fontSize.l};
            font-weight: ${({ theme }) => theme.fontWeight.bold};
            text-align: center;
          }
        `}
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 1em;
  width: 100%;
  box-shadow: 3px 3px 10px -3px hsla(0, 0%, 0%, 0.2);
`;

const Date = styled.p`
  display: block;
  margin: 0;
  padding: 0;
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.black};
`;

const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimeButton = styled.button`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bolder};
  color: ${({ theme }) => theme.black};
  text-align: center;
  background: transparent;
  border: none;
  margin: 0;
  padding: 0 0.5em;
`;

const Time = styled.p`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.black};
  text-align: center;
  margin: 0;
  padding: 0;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2em auto;
`;

const AddAppointment = ({ image }) => {
  const [inputValue, setInputValue] = useState('');
  const [services, setServices] = useState([]);

  const addImage = async imageName => {
    const getUrl = await import(`images/icons/services/${imageName}.svg`);
    const url = getUrl.default;
    return Promise.resolve(url);
  };

  const getAllServices = () => {
    const allIcons = require.context('../images/icons/services', false, /.*\.svg$/);
    const icons = [];

    allIcons.keys().map(key => {
      const label = key.slice(key.indexOf('/') + 1, key.lastIndexOf('.'));
      return icons.push(label);
    });

    return icons.map(label => ({ label, iconUrl: addImage(label) }));
  };

  const setAllServices = () => {
    const allData = getAllServices().map(service =>
      service.iconUrl.then(url => ({ label: service.label, iconUrl: url, chosen: false })),
    );
    return Promise.all(allData);
  };

  useEffect(() => {
    setAllServices()
      .then(data => setServices(data))
      .catch(err => console.log(err));
  });

  const handleUserInput = e => setInputValue(e.target.value);

  return (
    <Wrapper>
      <PageTitle>make new appointment</PageTitle>
      <Section>
        <SectionTitle>Choose client</SectionTitle>
        <SearchWrapper>
          <InputSearchField
            onChange={e => handleUserInput(e)}
            type="text"
            placeholder="Search"
            name="searchbar"
            value={inputValue}
          />
          <StyledMagnifierIcon />
          <SearchResults isEmpty={inputValue === ''}>
            <Result>
              {image ? <StyledPersonImage src={image} /> : <StyledPersonIcon />}
              <PersonName>Piotr Kawula</PersonName>
            </Result>
            <Result>
              {image ? <StyledPersonImage src={image} /> : <StyledPersonIcon />}
              <PersonName>Weronika Żurecka</PersonName>
            </Result>
            <Result>
              {image ? <StyledPersonImage src={image} /> : <StyledPersonIcon />}
              <PersonName>John Doe</PersonName>
            </Result>
            <Result>
              {image ? <StyledPersonImage src={image} /> : <StyledPersonIcon />}
              <PersonName>Jane Doe</PersonName>
            </Result>
          </SearchResults>
        </SearchWrapper>
      </Section>
      <Section>
        <SectionTitle>or add new one</SectionTitle>
        <StyledButton>Add new client</StyledButton>
      </Section>
      <Section>
        <SectionTitle>choose a service</SectionTitle>
        <ServicesContainer>
          {services ? (
            services.map(({ label, iconUrl, chosen }) => (
              <Service key={label} image={iconUrl} chosen={chosen} />
            ))
          ) : (
            <p>No services yet</p>
          )}
        </ServicesContainer>
      </Section>
      <Section>
        <SectionTitle>select date</SectionTitle>
        <DateContainer>
          <Date>Wed, 20th May 2020</Date>
          <TimeContainer>
            <TimeButton>-</TimeButton>
            <Time>21:30</Time>
            <TimeButton>+</TimeButton>
          </TimeContainer>
        </DateContainer>
      </Section>
      <ButtonsContainer>
        <Button cancel>Cancel</Button>
        <Button>Save</Button>
      </ButtonsContainer>
    </Wrapper>
  );
};

AddAppointment.propTypes = {
  image: propTypes.string,
};

AddAppointment.defaultProps = {
  image: null,
};

export default AddAppointment;
