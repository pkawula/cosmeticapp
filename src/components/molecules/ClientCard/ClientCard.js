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
import { AppointmentsContext } from 'contexts/Appointments';
import GlobalModal from 'components/atoms/GlobalModal/GlobalModal';
import { connect } from 'react-redux';
import { auth } from '../../../firebase';

const StyledWrapper = styled.section`
  display: block;
  min-height: 250px;
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.light};
  box-shadow: 2px 2px 15px -4px hsla(0, 0%, 0%, 0.2);
  margin: 2em auto;
`;

const StyledTopContainer = styled.article`
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
  background-color: ${({ theme }) => theme.light};

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
        background-image: ${`linear-gradient(135deg, ${theme.secondary}, ${theme.bg})`};
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

const ClientCard = ({ name, phone, email, image, clientID, deleteClient }) => {
  const { clients } = useContext(ClientsContext);
  const { appointments } = useContext(AppointmentsContext);

  const [modalOpened, setModal] = useState(false);
  const [globalModalOpened, setGlobalModal] = useState(false);

  const openGlobalModal = () => setGlobalModal(true);
  const closeGlobalModal = () => setGlobalModal(false);

  const filteredAppointments = appointments.filter(
    appointment => appointment.clientID === clientID,
  );

  const isTopCustomer = () => {
    if (!clients.length > 0) return false;

    const findValueOfAppointments = id =>
      appointments.filter(appointment => appointment.clientID === id).length;

    return clients.reduce((a, b) =>
      findValueOfAppointments(a.clientID) < findValueOfAppointments(b.clientID) ? b : a,
    ).clientID;
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  const nextVisit = () => {
    const today = new Date().getTime();

    const convertedTime = filteredAppointments.reduce((prevVal, curVal) => {
      const prevValue =
        typeof prevVal === 'object'
          ? new Date(prevVal.visitDate).getTime()
          : new Date(prevVal).getTime();
      const curValue =
        typeof curVal === 'object'
          ? new Date(curVal.visitDate).getTime()
          : new Date(curVal).getTime();

      return curValue > today && Math.abs(curValue - today) < Math.abs(prevValue - today)
        ? curValue
        : prevValue;
    });

    if (typeof convertedTime === 'object') {
      const visitTime = new Date(convertedTime.visitDate);

      if (visitTime.getTime() < today) return 'No new planned visits';

      return `${weekDays[visitTime.getDay()]}, ${visitTime.getDate()} ${
        months[visitTime.getMonth()]
      } | ${visitTime.getHours()}:${visitTime.getMinutes() === 0 ? '00' : visitTime.getMinutes()}`;
    }

    const closestTime = new Date(convertedTime);

    if (closestTime < today) return 'No new planned visits';

    return `${weekDays[closestTime.getDay()]}, ${closestTime.getDate()} ${
      months[closestTime.getMonth()]
    } | ${closestTime.getHours()}:${
      closestTime.getMinutes() === 0 ? '00' : closestTime.getMinutes()
    }`;
  };

  const toggleModal = () => {
    setModal(!modalOpened);
  };

  const confirmFunc = () => {
    closeGlobalModal();
    deleteClient(auth.currentUser.uid, {
      name,
      phone,
      email,
      image,
      clientID,
    });
  };

  return (
    <StyledWrapper>
      {globalModalOpened && <GlobalModal confirm={confirmFunc} cancel={closeGlobalModal} />}
      <StyledTopContainer>
        <StyledIconsContainer>
          <ButtonIcon onClick={() => openGlobalModal()} src={TrashIcon} alt="Delete" />
          <ButtonIcon onClick={() => toggleModal()} src={PenIcon} alt="Edit" />
        </StyledIconsContainer>
        <StyledImageContainer topCustomer={isTopCustomer() === clientID ? 1 : 0}>
          <StyledImage src={image || ProfilePicture} alt="Profile" />
        </StyledImageContainer>
        <StyledName>{name}</StyledName>
      </StyledTopContainer>
      <StyledBottomContainer>
        <StyledList>
          <StyledListHeading>Contact info</StyledListHeading>
          <StyledListItem src={PhoneIcon} data-tooltip="Phone number">
            <Link href={`tel: ${phone} `}>{phone}</Link>
          </StyledListItem>
          <StyledListItem src={MailIcon} data-tooltip="email address">
            <Link href={`mailto: ${email} `}>{email}</Link>
          </StyledListItem>
        </StyledList>
        <StyledList>
          <StyledListHeading>Visit info</StyledListHeading>
          <StyledListItem src={LipstickIcon} bold data-tooltip="All Visits">
            {filteredAppointments.length}
          </StyledListItem>
          <StyledListItem src={VisitIcon} data-tooltip="Next visit">
            {filteredAppointments.length ? nextVisit() : 'no planned visits yet'}
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
  image: propTypes.string,
  deleteClient: propTypes.func.isRequired,
};

ClientCard.defaultProps = {
  image: null,
};

const mapDispatchToProps = dispatch => ({
  deleteClient: (userId, clientData) =>
    dispatch({ type: REMOVE_CLIENT, payload: { ...clientData }, userId }),
});

export default connect(null, mapDispatchToProps)(ClientCard);
