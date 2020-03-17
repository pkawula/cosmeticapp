import React from 'react';
import Logo from 'components/atoms/Logo/Logo';
import styled from 'styled-components';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import SettingsIcon from 'images/icons/settings_icon.svg';
import LogoutIcon from 'images/icons/logout_icon.svg';
import { Link } from 'react-router-dom';
import { routes } from 'routes';

const StyledHeader = styled.header`
  width: 100vw;
  min-height: 3em;
  background-color: ${({ theme }) => theme.bg};
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.5em;
  padding-right: 0.5em;
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

const TopBar = () => (
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
      <StyledButtonIcon
        as={Link}
        to={routes.login}
        src={LogoutIcon}
        data-title="logout"
        alt="logout"
      />
    </StyledNav>
  </StyledHeader>
);

export default TopBar;
