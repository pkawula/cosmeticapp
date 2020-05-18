import React, { useState } from 'react';
import styled from 'styled-components';
import PageTitle from 'components/atoms/PageTitle/PageTitle';
import { ReactComponent as MagnifierIcon } from 'images/icons/search.svg';
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
  padding: 0.5em;
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

const StyledButton = styled(Button)`
  display: block;
`;

const ServicesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;

const Service = styled.div`
  display: block;
  width: 4em;
  height: 4em;
  margin: 0.5em;
  padding: 0.5em;
  border: 2px dotted ${({ theme }) => theme.black};
  background: hsl(0, 0%, 94%);
  position: relative;

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
`;

const AddAppointment = () => {
  const [inputValue, setInputValue] = useState('');

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
        </SearchWrapper>
      </Section>
      <Section>
        <SectionTitle>or add new one</SectionTitle>
        <StyledButton>Add new client</StyledButton>
      </Section>
      <Section>
        <SectionTitle>choose a service</SectionTitle>
        <ServicesContainer>
          <Service />
          <Service />
          <Service />
          <Service />
          <Service />
        </ServicesContainer>
      </Section>
    </Wrapper>
  );
};

export default AddAppointment;
