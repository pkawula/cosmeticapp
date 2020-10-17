import React from 'react';
import propTypes from 'prop-types';
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
    background-image: ${`linear-gradient(135deg, ${theme.secondary}, ${theme.bg})`};
    display: block;
    margin: 0.5em auto;
    padding: 0.3em 0;
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

const Card = ({ children, cardTitle }) => (
  <StyledWrapper>
    <StyledHeading>{cardTitle}</StyledHeading>
    <StyledInnerWrapper>{children}</StyledInnerWrapper>
  </StyledWrapper>
);

Card.propTypes = {
  children: propTypes.oneOfType([propTypes.node, propTypes.element]).isRequired,
  cardTitle: propTypes.string.isRequired,
};

export default Card;
