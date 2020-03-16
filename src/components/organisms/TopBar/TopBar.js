import React from 'react';
import Logo from 'components/atoms/Logo/Logo';
import styled from 'styled-components';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import SettingsIcon from 'images/icons/settings_icon.svg';
import LogoutIcon from 'images/icons/logout_icon.svg';

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

const TopBar = () => (
  <>
    <StyledHeader>
      <Logo />
      <StyledNav>
        <ButtonIcon src={SettingsIcon} data-title="settings" alt="settings" />
        <ButtonIcon src={LogoutIcon} data-title="logout" alt="logout" />
      </StyledNav>
    </StyledHeader>
  </>
);

export default TopBar;
