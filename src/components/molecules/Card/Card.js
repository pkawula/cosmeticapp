import React from 'react';
import Button from 'components/atoms/Button/Button';
import styled, { css } from 'styled-components';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 250px;
  border-radius: 10px;
  margin: 2em auto;
  background: ${({ theme }) => theme.light};
  box-shadow: 0px 3px 10px -1px hsla(0, 0%, 0%, 0.2);
`;

const StyledHeading = styled.h1(
  ({ theme }) => css`
    font-size: ${theme.fontSize.m};
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.light};
    background-color: ${theme.secondary};
    display: block;
    margin: 0.5rem auto;
    border-radius: 10px 10px 0 0;
    text-align: center;
    box-shadow: 0px 3px 10px -1px hsla(0, 0%, 0%, 0.2);
  `,
);

const StyledInnerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: -0.5em;
  align-items: center;
  padding: 0.5em;
`;

const Card = () => (
  <StyledWrapper>
    <StyledHeading>Clients</StyledHeading>
    <StyledInnerWrapper>
      <Button secondary>All clients</Button>
      <Button>Add new</Button>
    </StyledInnerWrapper>
  </StyledWrapper>
);

export default Card;
