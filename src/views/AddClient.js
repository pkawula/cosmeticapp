import React, { useState } from 'react';
import propTypes from 'prop-types';
import ProfilePicture from 'images/person.svg';
import InputField from 'components/atoms/InputField/InputField';
import Button from 'components/atoms/Button/Button';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
// import { ClientsContext } from 'contexts/Clients';
import { ADD_CLIENT } from 'reducers/Clients';
import PageTitle from 'components/atoms/PageTitle/PageTitle';
import { auth } from '../firebase';

const StyledWrapper = styled.div`
  width: 100%;
  border-radius: 1em 1em 0;
  padding: 1em 0.5em 0 0.5em;
  background: ${({ theme }) => theme.light};
`;

const StyledLabelContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const StyledLabel = styled.label`
  display: inline-block;
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

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: 1em auto;
`;

const StyledSubmittingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 1em;
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

const AddClient = ({ addClient, history: { goBack } }) => {
  // const { dispatch } = useContext(ClientsContext);
  const [client, setClient] = useState('');
  const [error, setError] = useState('');
  const [buttonActive, setButton] = useState(true);

  const handleUserInput = e => {
    const fieldType = e.target.id;
    const fieldValue = e.target.value;

    setClient({ ...client, [fieldType]: fieldValue });
  };

  const getImageDetails = e => {
    const file = e.target.files[0];
    const reader = new window.FileReader();

    reader.onloadstart = () => {
      setButton(false);
    };

    reader.onloadend = () => {
      if (reader.readyState === 2) {
        setClient({ ...client, image: reader.result });
        setButton(true);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (client.name && client.phone && client.email) {
      addClient(auth.currentUser.uid, { ...client });
      setClient({});
      setError({ type: 'success', message: 'Client added successfully' });
      setTimeout(() => setError(''), 1000);
    } else {
      setError({ type: 'error', message: 'Fill in all fields!' });
      setTimeout(() => setError(''), 3000);
    }
  };

  const cancel = e => {
    e.preventDefault();
    goBack();
  };

  return (
    <StyledWrapper>
      <PageTitle>Add new client</PageTitle>
      <StyledLabelContainer>
        <StyledLabel title="add/change image">
          <StyledImage src={client.image || ProfilePicture} alt="Profile picture" />
          <StyledInputField
            type="file"
            accept="image/*"
            onChange={e => getImageDetails(e)}
            name="addImage"
          />
        </StyledLabel>
      </StyledLabelContainer>
      <StyledForm>
        <InputField
          type="text"
          placeholder="name"
          name="name"
          id="name"
          value={client.name ? client.name : ''}
          onChange={handleUserInput}
        />
        <InputField
          type="tel"
          pattern="(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)"
          name="phoneNumber"
          id="phone"
          placeholder="phone number"
          onChange={handleUserInput}
          value={client.phone ? client.phone : ''}
        />
        <InputField
          type="email"
          placeholder="email address"
          name="email"
          id="email"
          onChange={handleUserInput}
          value={client.email ? client.email : ''}
        />
        <StyledSubmittingContainer>
          <Button type="button" cancel="true" onClick={e => cancel(e)}>
            Cancel
          </Button>
          <Button disabled={!buttonActive} type="submit" onClick={e => handleSubmit(e)}>
            Save
          </Button>
          <Button secondary="true" as={Link} to={routes.clients}>
            All clients
          </Button>
        </StyledSubmittingContainer>
      </StyledForm>
      <ErrorContainer>
        {error && <ErrorMessage type={error.type}>{error.message}</ErrorMessage>}
      </ErrorContainer>
    </StyledWrapper>
  );
};

AddClient.propTypes = {
  history: propTypes.shape({
    goBack: propTypes.func.isRequired,
  }).isRequired,
  addClient: propTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addClient: (userId, userData) => dispatch({ type: ADD_CLIENT, payload: userData, userId }),
});

export default connect(null, mapDispatchToProps)(AddClient);
