import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
import Logo from 'components/atoms/Logo/Logo';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import SettingsIcon from 'images/icons/settings_icon.svg';
import LogoutIcon from 'images/icons/logout_icon.svg';
import { auth } from '../../../firebase';

const StyledHeader = styled.header`
  width: 100vw;
  min-height: 4em;
  z-index: -1;
  background-image: ${({ theme }) => `linear-gradient(135deg, ${theme.secondary}, ${theme.bg})`};
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.5em;
  padding-right: 0.5em;
  padding-bottom: 1em;
  margin-bottom: -1em;
  box-shadow: 0px 5px 15px -3px hsla(0, 0%, 0%, 0.2);
`;

const StyledNav = styled.nav`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
`;

const StyledButtonIcon = styled(ButtonIcon)`
  width: auto;
  height: auto;
  min-width: 2.7rem;
  min-height: 2.7rem;
  display: block;
  background-size: 100%;
  border-radius: 0;
  &:last-of-type {
    margin-right: 1em;
  }
`;

const TopBar = () => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <StyledHeader>
      <Logo />
      <StyledNav>
        <StyledButtonIcon
          as={Link}
          to={routes.settings}
          src={SettingsIcon}
          data-title="settings"
          alt="settings"
        />
        <StyledButtonIcon src={LogoutIcon} data-title="logout" onClick={handleLogout} />
      </StyledNav>
    </StyledHeader>
  );
};

export default TopBar;
