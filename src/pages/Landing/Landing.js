import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'components/atoms/Button/Button';
import AuthForm from 'components/organisms/AuthForm/AuthForm';
import { routes } from 'routes';

const Wrapper = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10vh 1em 1em;
  background-image: ${({ theme }) => `linear-gradient(135deg, ${theme.bg}, ${theme.secondary})`};
`;

const Heading = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bolder};
  text-transform: uppercase;
  text-align: center;
  color: ${({ theme }) => theme.light};
`;

const PromoSubtitle = styled.p`
  display: block;
  width: 100%;
  max-width: 350px;
  margin: 2em auto;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.light};
  opacity: 0.7;
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin: 5em auto 0;
`;

const LandingPage = ({ displayForm }) => (
  <Wrapper>
    <Heading>CosmeticApp</Heading>
    <PromoSubtitle>Manage your cosmetic business easy with class</PromoSubtitle>
    {displayForm ? (
      <AuthForm formToDisplay={displayForm} />
    ) : (
      <ButtonsWrapper>
        <Button as={Link} to={routes.register}>
          Sign up
        </Button>
        <Button as={Link} to={routes.login} secondary>
          Sign in
        </Button>
      </ButtonsWrapper>
    )}
  </Wrapper>
);

LandingPage.propTypes = {
  displayForm: PropTypes.string,
};

LandingPage.defaultProps = {
  displayForm: '',
};

export default LandingPage;
