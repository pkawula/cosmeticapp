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
  display: inline-block;
  width: auto;
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

const StyledCloseButton = styled.button`
  width: 3em;
  height: 3em;
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  padding: 2em;
  margin: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  z-index: 99;

  &::before,
  &::after {
    content: '';
    width: 100%;
    height: 5px;
    background-color: ${({ theme }) => theme.black};
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transform-origin: center;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const EditClient = ({ name, email, phone, picture, toggleModal }) => (
  <StyledWrapper>
    <StyledCloseButton onClick={toggleModal} />
    <StyledLabel title="add/change image">
      <StyledImage src={picture || ProfilePicture} alt="Profile picture" />
      <StyledInputField type="file" accept="image/*" name="addImage" />
    </StyledLabel>
    <InputField value={name} placeholder="name" id="name" />
    <InputField value={phone} placeholder="phone" id="phone" />
    <InputField value={email} placeholder="email" id="email" />
    <Button cancel onClick={toggleModal}>
      Cancel
    </Button>
    <Button>Save</Button>
  </StyledWrapper>
);

EditClient.propTypes = {
  name: propTypes.string.isRequired,
  phone: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
  picture: propTypes.string.isRequired,
  toggleModal: propTypes.func.isRequired,
};

export default EditClient;
