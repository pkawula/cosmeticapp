import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import ProfilePicture from 'images/person.svg';
import InputField from 'components/atoms/InputField/InputField';
import Button from 'components/atoms/Button/Button';

const StyledWrapper = styled.div`
  width: 100%;
  max-width: 450px;
  height: auto;
  min-height: 90vh;
  margin: auto;
  padding: 1em;
  border-radius: 1em;
  box-shadow: 0px 0px 200px -100px hsla(0, 0%, 0%, 0.4);
  background: ${({ theme }) => theme.light};
  position: fixed;
  top: 1em;
  left: 1em;
  right: 1em;
  z-index: 999;
  animation: fadeIn 0.3s ease-in-out 1;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const StyledLabel = styled.label`
  display: block;
  width: 100%;
  margin: 0 auto 1em;
  position: relative;

  &::after {
    content: '+';
    position: absolute;
    bottom: 0em;
    left: calc(50% + 1.2em);
    width: 1.2em;
    height: 1.2em;
    padding: 0.1em;
    font-size: ${({ theme }) => theme.fontSize.l};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    text-align: center;
    color: ${({ theme }) => theme.light};
    background-color: ${({ theme }) => theme.primary};
    border-radius: 50%;
    margin: 0;
    line-height: 1;
    box-shadow: 2px 2px 15px -4px hsla(0, 0%, 0%, 0.2);
    cursor: pointer;
  }
`;

const StyledImage = styled.img`
  display: block;
  width: 150px;
  height: 150px;
  object-fit: cover;
  object-position: center;
  box-shadow: 2px 2px 15px -4px hsla(0, 0%, 0%, 0.2);
  background-color: transparent;
  border-radius: 50%;
  padding: 0;
  margin: 0 auto;
  cursor: pointer;
`;

const StyledInputField = styled.input`
  display: none;
  visibility: hidden;
`;

const EditClient = ({ name, email, phone, picture }) => (
  <StyledWrapper>
    <StyledLabel title="add/change image">
      <StyledImage src={picture || ProfilePicture} alt="Profile picture" />
      <StyledInputField type="file" accept="image/*" name="addImage" />
    </StyledLabel>
    <InputField value={name} placeholder="name" id="name" />
    <InputField value={phone} placeholder="phone" id="phone" />
    <InputField value={email} placeholder="email" id="email" />
    <Button cancel>Cancel</Button>
    <Button>Save</Button>
  </StyledWrapper>
);

EditClient.propTypes = {
  name: propTypes.string.isRequired,
  phone: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
  picture: propTypes.string.isRequired,
};

export default EditClient;
