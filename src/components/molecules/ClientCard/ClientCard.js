import React, { useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import propTypes from 'prop-types';
import { ClientsContext } from 'contexts/Clients';
import { REMOVE_CLIENT } from 'reducers/Clients';
import ProfilePicture from 'images/person.svg';
import TrashIcon from 'images/icons/delete_icon.svg';
import PenIcon from 'images/icons/pen_icon.svg';
import PhoneIcon from 'images/icons/phone_icon.svg';
import MailIcon from 'images/icons/mail_icon.svg';
import LipstickIcon from 'images/icons/lipstick_icon.svg';
import VisitIcon from 'images/icons/visit_icon.svg';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import Link from 'components/atoms/Link/Link';
import EditClient from 'components/organisms/EditClient/EditClient';

const StyledWrapper = styled.main`
  display: block;
  min-height: 250px;
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.light};
  box-shadow: 2px 2px 15px -4px hsla(0, 0%, 0%, 0.2);
  margin: 2em auto;
`;

const StyledTopContainer = styled.section`
  display: block;
  position: relative;
  border-bottom: 2px solid ${({ theme }) => theme.black};
`;

const StyledIconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em;
  position: absolute;
  top: 1em;
  left: 0;
  right: 0;
  z-index: 1;
`;

const StyledImageContainer = styled.div`
  position: relative;
  width: 100%;

  ${({ topCustomer, theme }) =>
    topCustomer &&
    css`
      ::after {
        content: 'TOP CUSTOMER';
        display: block;
        position: absolute;
        min-width: 174px;
        bottom: -0.5em;
        left: 50%;
        transform: translateX(-50%);
        background: ${theme.bg};
        font-size: ${theme.fontSize.s};
        font-weight: ${theme.fontWeight.bold};
        color: ${theme.light};
        text-transform: uppercase;
        border-radius: 10px;
        padding: 0.5em 1em;
      }
    `}
`;

const StyledImage = styled.img`
  display: block;
  width: 150px;
  height: 150px;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  margin: -1em auto 1em;
  box-shadow: 2px 2px 15px -4px hsla(0, 0%, 0%, 0.2);
`;

const StyledName = styled.h2`
  text-align: center;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  margin-top: 0;
  margin-bottom: 0;
`;

const StyledBottomContainer = styled.section`
  display: block;
  padding: 0.5em;
`;

const StyledList = styled.ul`
  list-style: none;
  margin: 1em 0.5em;
  padding: 0;
`;

const StyledListItem = styled.li`
  list-style: none;
  padding-left: 3em;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  display: block;
  position: relative;
  margin: 0.5em 0;

  &:hover::after {
    transform: scale(1) translateY(-50%);
    opacity: 1;
  }

  &::after {
    content: attr(data-tooltip);
    font-size: ${({ theme }) => theme.fontSize.xxs};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.light};
    text-transform: uppercase;
    text-align: center;
    position: absolute;
    top: 50%;
    right: 100%;
    background: hsla(0, 0%, 0%, 0.6);
    border-radius: 0.5em;
    padding: 0.5em;
    opacity: 0;
    transform: scale(0) translateY(-50%);
    transform-origin: top right;
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.2), opacity linear 0.1s;
  }

  &::before {
    content: '';
    width: ${({ theme }) => theme.fontSize.m};
    height: ${({ theme }) => theme.fontSize.m};
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    background-image: url(${({ src }) => src});
    background-size: 95%;
    background-repeat: no-repeat;
    background-position: center;
  }

  ${({ bold }) =>
    bold &&
    css`
      font-weight: ${({ theme }) => theme.fontWeight.bold};
    `};
`;

const StyledListHeading = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-transform: uppercase;
  margin: 0 0 0.5em;
`;

const ClientCard = ({ topCustomer, name, phone, email, image, clientID }) => {
  const { dispatch } = useContext(ClientsContext);

  const [modalOpened, setModal] = useState(false);

  const deleteClient = id => {
    dispatch({ type: REMOVE_CLIENT, id });
  };

  const toggleModal = () => {
    setModal(!modalOpened);
  };

  return (
    <StyledWrapper>
      <StyledTopContainer>
        <StyledIconsContainer>
          <ButtonIcon onClick={() => deleteClient(clientID)} src={TrashIcon} alt="Delete" />
          <ButtonIcon onClick={() => toggleModal()} src={PenIcon} alt="Edit" />
        </StyledIconsContainer>
        <StyledImageContainer topCustomer={topCustomer}>
          <StyledImage src={image || ProfilePicture} alt="Profile" />
        </StyledImageContainer>
        <StyledName>{name}</StyledName>
      </StyledTopContainer>
      <StyledBottomContainer>
        <StyledList>
          <StyledListHeading>Contact info</StyledListHeading>
          <StyledListItem src={PhoneIcon} data-tooltip="Phone number">
            <Link href={`tel:${phone}`}>{phone}</Link>
          </StyledListItem>
          <StyledListItem src={MailIcon} data-tooltip="email address">
            <Link href={`mailto:${email}`}>{email}</Link>
          </StyledListItem>
        </StyledList>
        <StyledList>
          <StyledListHeading>Visit info</StyledListHeading>
          <StyledListItem src={LipstickIcon} bold data-tooltip="All Visits">
            23
          </StyledListItem>
          <StyledListItem src={VisitIcon} data-tooltip="Next visit">
            tuesday, 27th june, 7 a.m.
          </StyledListItem>
        </StyledList>
      </StyledBottomContainer>
      {modalOpened && (
        <EditClient
          toggleModalFunc={() => toggleModal()}
          name={name}
          email={email}
          phone={phone}
          image={image}
          clientID={clientID}
        />
      )}
    </StyledWrapper>
  );
};

ClientCard.propTypes = {
  name: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
  phone: propTypes.string.isRequired,
  clientID: propTypes.string.isRequired,
  topCustomer: propTypes.bool,
  image: propTypes.string,
};

ClientCard.defaultProps = {
  topCustomer: false,
  image: null,
};

export default ClientCard;
