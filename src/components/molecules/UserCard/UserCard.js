import React from 'react';
import ProfilePicture from 'images/person.svg';
import PenIcon from 'images/icons/pen_icon.svg';
import InputField from 'components/atoms/InputField/InputField';
import Button from 'components/atoms/Button/Button';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { routes } from 'routes';

const StyledWrapper = styled.div`
  width: 100%;
  max-width: 90%;
  box-shadow: 2px 2px 15px -4px hsla(0, 0%, 0%, 0.2);
  background-color: ${({ theme }) => theme.light};
  padding: 1em;
  margin: 2em auto;
`;

const StyledImageSection = styled.section`
  display: block;
  width: 100%;
  margin: 0 auto 1em;
  position: relative;
`;

const StyledImage = styled.img`
  display: block;
  width: 100%;
  max-width: 150px;
  box-shadow: 2px 2px 15px -4px hsla(0, 0%, 0%, 0.2);
  background-color: transparent;
  border-radius: 50%;
  padding: 0;
  margin: 0 auto;
`;

const StyledLabel = styled.label`
  background: transparent;
  width: 40px;
  height: 40px;
  background-image: url(${PenIcon});
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  border: none;
  border-radius: 0;
  position: absolute;
  top: 0px;
  right: 0;
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

const StyledLinkButton = styled(Button)`
  text-decoration: none;
`;

const UserCard = () => (
  <StyledWrapper>
    <StyledImageSection>
      <StyledImage src={ProfilePicture} alt="Profile picture" />
      <StyledLabel title="add/change image">
        <StyledInputField type="file" name="addImage" />
      </StyledLabel>
    </StyledImageSection>
    <StyledForm>
      <InputField type="text" placeholder="name" name="name" />
      <InputField
        type="tel"
        pattern="(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)"
        name="phoneNumber"
        placeholder="phone number"
      />
      <InputField type="email" placeholder="email address" name="email" />
      <StyledSubmittingContainer>
        <StyledLinkButton cancel as={Link} to={routes.clients}>
          Cancel
        </StyledLinkButton>
        <Button>Save</Button>
      </StyledSubmittingContainer>
    </StyledForm>
  </StyledWrapper>
);

export default UserCard;
