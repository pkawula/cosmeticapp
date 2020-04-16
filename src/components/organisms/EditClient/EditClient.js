import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import ProfilePicture from 'images/person.svg';
import InputField from 'components/atoms/InputField/InputField';
import Button from 'components/atoms/Button/Button';
import { ClientsContext } from 'contexts/Clients';
import { UPDATE_CLIENT } from 'reducers/Clients';

const StyledWrapper = styled.div`
  width: 100%;
  max-width: 90%;
  height: auto;
  min-height: 90vh;
  margin: auto;
  padding: 1em;
  border-radius: 1em;
  box-shadow: 0px 0px 200px -30px hsla(0, 0%, 0%, 0.7);
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

const StyledLabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
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
  width: 2em;
  height: 2em;
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  padding: 1.5em;
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
    box-shadow: 2px 2px 15px -4px hsla(0, 0%, 0%, 0.2);
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const ErrorContainer = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-end;
  position: fixed;
  flex-direction: column;
  top: 2em;
  right: 2em;
`;

const ErrorMessage = styled.span`
  display: block;
  margin: 0.5em 0;
  padding: 1em;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.light};
  text-align: center;
  background-color: ${({ type, theme }) =>
    (type === 'success' && theme.success) || (type === 'error' && theme.cancel)};
  border-radius: 0.5em;
`;

const EditClient = ({ name, email, phone, image, clientID, toggleModalFunc }) => {
  const { dispatch } = useContext(ClientsContext);
  const [client, setClient] = useState({ name, email, phone, image, clientID });
  const [error, setError] = useState('');

  const onImageChange = e => {
    const file = e.target.files[0];
    const reader = new window.FileReader();

    reader.onload = () => {
      setClient({ ...client, image: reader.result });
    };

    reader.readAsDataURL(file);
  };

  const onUserInput = e => {
    const fieldName = e.target.id;
    const fieldValue = e.target.value;

    setClient({ ...client, [fieldName]: fieldValue });
  };

  const onSave = e => {
    e.preventDefault();

    if (client.name && client.phone && client.email) {
      dispatch({ type: UPDATE_CLIENT, payload: { ...client } });
      setClient({});
      setError({ type: 'success', message: 'Client added successfully' });
      setTimeout(() => setError(''), 1000);
    } else {
      setError({ type: 'error', message: 'Fill in all fields!' });
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <StyledWrapper>
      <StyledCloseButton onClick={() => toggleModalFunc()} />
      <StyledLabelContainer>
        <StyledLabel title="add/change image">
          <StyledImage src={client.image || ProfilePicture} alt="Profile picture" />
          <StyledInputField
            onChange={e => onImageChange(e)}
            type="file"
            accept="image/*"
            name="addImage"
          />
        </StyledLabel>
      </StyledLabelContainer>
      <InputField onChange={e => onUserInput(e)} value={client.name} placeholder="name" id="name" />
      <InputField
        onChange={e => onUserInput(e)}
        value={client.phone}
        placeholder="phone"
        id="phone"
      />
      <InputField
        onChange={e => onUserInput(e)}
        value={client.email}
        placeholder="email"
        id="email"
      />
      <Button cancel onClick={() => toggleModalFunc()}>
        Cancel
      </Button>
      <Button
        type="submit"
        onClick={e => {
          onSave(e);
          toggleModalFunc();
        }}
      >
        Save
      </Button>
      <ErrorContainer>
        {error && <ErrorMessage type={error.type}>{error.message}</ErrorMessage>}
      </ErrorContainer>
    </StyledWrapper>
  );
};

EditClient.propTypes = {
  name: propTypes.string.isRequired,
  phone: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
  clientID: propTypes.string.isRequired,
  toggleModalFunc: propTypes.func.isRequired,
  image: propTypes.string,
};

EditClient.defaultProps = {
  image: null,
};

export default EditClient;
