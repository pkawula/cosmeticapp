import React from 'react';
import styled, { css } from 'styled-components';
import propTypes from 'prop-types';

const StyledWrapper = styled.label`
  width: 100%;
  display: block;
  position: relative;
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ theme }) => theme.black};
  padding: 0.5em;
  margin: 2em auto 0;
  box-shadow: 2px 2px 10px -1px hsla(0, 0%, 0%, 0.2);
  border: none;
  border-bottom: 3px solid ${({ theme }) => theme.primary};
  border-radius: 0.5em 0.5em 0 0;
  background: ${({ theme }) => theme.light};
  ${({ errored }) =>
    errored &&
    css`
      border-bottom-color: ${({ theme }) => theme.cancel};
    `}

  & ~ span {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(0.5em, 0.5em);
    font-size: 1em;
    transition: transform 0.3s ease-in-out;
    opacity: 0.6;
    pointer-events: none;
    color: ${({ theme }) => theme.black};
  }

  &:focus ~ span,
  &:active ~ span,
  &:not([value='']) ~ span {
    transform: translate(0em, -1.5em);
    text-transform: uppercase;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    opacity: 1;

    ${({ errored }) =>
      errored &&
      css`
        color: ${({ theme }) => theme.cancel};
      `}
  }

  &:not([value='']) {
    border-bottom-color: ${({ theme }) => theme.success};
  }

  &:disabled {
    color: hsl(0, 0%, 30%);
    opacity: 0.7;
  }
`;

const InputError = styled.p`
  display: block;
  margin: 0.5em 0 1em;
  color: ${({ theme }) => theme.cancel};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-size: ${({ theme }) => theme.fontWeight.bold};

  &::first-letter {
    text-transform: capitalize;
  }
`;

const InputField = ({ type, name, placeholder, error, ...props }) => (
  <StyledWrapper>
    <StyledInput errored={error} type={type} name={name} {...props} />
    <span errored={error}>{placeholder}</span>
    {error && <InputError>{error}</InputError>}
  </StyledWrapper>
);

InputField.propTypes = {
  type: propTypes.string,
  name: propTypes.string.isRequired,
  placeholder: propTypes.string,
  error: propTypes.string,
  props: propTypes.oneOfType([propTypes.string, propTypes.func, propTypes.bool]),
};

InputField.defaultProps = {
  type: 'text',
  placeholder: '',
  error: '',
  props: null,
};

export default InputField;
