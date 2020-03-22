import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

const StyledInput = styled.input`
  display: block;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.s};
  padding: 0.5em;
  margin: 0.5em auto;
  box-shadow: 2px 2px 10px -1px hsla(0, 0%, 0%, 0.2);
  border: 3px solid ${({ theme }) => theme.primary};
  border-radius: 0.5em;
  background: transparent;
`;

const InputField = ({ type, name, placeholder, ...props }) => (
  <StyledInput type={type} {...name} placeholder={placeholder} {...props} />
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
