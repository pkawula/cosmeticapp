import React from 'react';
import ProfilePicture from 'images/person.svg';
import InputField from 'components/atoms/InputField/InputField';
import Button from 'components/atoms/Button/Button';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
import { Clients } from 'actions';

const StyledWrapper = styled.div`
  width: 100%;
  max-width: 90%;
  box-shadow: 2px 2px 15px -4px hsla(0, 0%, 0%, 0.2);
  background-color: ${({ theme }) => theme.light};
  padding: 1em;
  margin: 2em auto;
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
  justify-content: space-between;
  align-items: center;
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

class AddClient extends React.Component {
  state = {
    name: '',
    phone: '',
    email: '',
    image: '',
    allClients: [],
    error: {
      type: '',
      message: '',
    },
  };

  handleUserInput = e => {
    const fieldType = e.target.id;
    const fieldValue = e.target.value;

    this.setState({
      [fieldType]: fieldValue,
    });
  };

  getImageDetails = e => {
    const file = e.target.files[0];
    const reader = new window.FileReader();

    reader.onload = () => {
      this.setState({ image: reader.result });
    };

    reader.readAsDataURL(file);
  };

  saveUser = e => {
    e.preventDefault();
    const { name, phone, email, image } = this.state;
    const id = Math.random()
      .toString(36)
      .substr(2, 9);

    if ((name !== '', phone !== '', email !== '', image)) {
      this.setState(prevState => ({
        allClients: [...prevState.allClients, { userID: id, name, phone, email, image }],
        error: { type: 'success', message: 'The client is added' },
      }));

      Clients.save({ name, phone, email, image, userID: id });

      setTimeout(
        () =>
          this.setState({
            name: '',
            phone: '',
            email: '',
            image: '',
            allClients: [],
            error: {
              type: '',
              message: '',
            },
          }),
        3000,
      );
    } else {
      this.setState({ error: { type: 'error', message: 'Please fill in all fields' } });
      setTimeout(
        () =>
          this.setState({
            error: {
              type: '',
              message: '',
            },
          }),
        5000,
      );
    }
  };

  render() {
    const { name, phone, email, image, error } = this.state;

    return (
      <StyledWrapper>
        <StyledLabel title="add/change image">
          <StyledImage src={image || ProfilePicture} alt="Profile picture" />
          <StyledInputField
            type="file"
            accept="image/*"
            onChange={e => this.getImageDetails(e)}
            name="addImage"
          />
        </StyledLabel>
        <StyledForm>
          <InputField
            type="text"
            placeholder="name"
            name="name"
            id="name"
            value={name}
            onChange={this.handleUserInput}
          />
          <InputField
            type="tel"
            pattern="(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)"
            name="phoneNumber"
            id="phone"
            placeholder="phone number"
            onChange={this.handleUserInput}
            value={phone}
          />
          <InputField
            type="email"
            placeholder="email address"
            name="email"
            id="email"
            onChange={this.handleUserInput}
            value={email}
          />
          <StyledSubmittingContainer>
            <Button as={Link} cancel="true" to={routes.clients}>
              Cancel
            </Button>
            <Button type="submit" onClick={e => this.saveUser(e)}>
              Save
            </Button>
          </StyledSubmittingContainer>
        </StyledForm>
        <ErrorContainer>
          {error && <ErrorMessage type={error.type}>{error.message}</ErrorMessage>}
        </ErrorContainer>
      </StyledWrapper>
    );
  }
}

export default AddClient;
