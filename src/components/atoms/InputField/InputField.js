import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

const StyledWrapper = styled.div`
  width: 100%;
  display: block;
  position: relative;
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.s};
  padding: 0.5em;
  margin: 1.5em auto;
  box-shadow: 2px 2px 10px -1px hsla(0, 0%, 0%, 0.2);
  border: none;
  border-bottom: 3px solid ${({ theme }) => theme.primary};
  border-radius: 0.5em 0.5em 0 0;
  background: transparent;

  & ~ span {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(0.5em, 2em);
    font-size: 1em;
    transition: transform 0.3s ease-in-out;
    opacity: 0.6;
    pointer-events: none;
  }

  &:focus ~ span,
  &:active ~ span,
  &:not([value='']) ~ span {
    transform: translate(0em, -0.5em);
    text-transform: uppercase;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    opacity: 1;
  }

  &:not([value='']) {
    border-bottom-color: ${({ theme }) => theme.success};
  }

  &:disabled {
    color: hsl(0, 0%, 30%);
    opacity: 0.7;
  }
`;

const InputField = ({ type, name, placeholder, ...props }) => (
  <StyledWrapper>
    <StyledInput type={type} {...name} {...props} />
    <span>{placeholder}</span>
  </StyledWrapper>
);

InputField.propTypes = {
  type: propTypes.string,
  name: propTypes.string.isRequired,
  placeholder: propTypes.string,
  props: propTypes.oneOfType([propTypes.string, propTypes.func, propTypes.node, propTypes.bool]),
};

InputField.defaultProps = {
  type: 'text',
  placeholder: '',
  props: null,
};

export default InputField;
