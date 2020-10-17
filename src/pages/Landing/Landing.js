import Button from 'components/atoms/Button/Button';
import AuthForm from 'components/organisms/AuthForm/AuthForm';
import React, { useState } from 'react';
import styled from 'styled-components';

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

const LandingPage = () => {
  const [isFormChosen, setIsFormChosen] = useState(false);
  const [form, showForm] = useState('login');

  const handleRegisterClick = () => {
    setIsFormChosen(true);
    showForm('register');
  };

  const handleLoginClick = () => setIsFormChosen(true);

  return (
    <Wrapper>
      <Heading>CosmeticApp</Heading>
      <PromoSubtitle>Manage your cosmetic business easy with class</PromoSubtitle>
      {isFormChosen ? (
        <AuthForm formToDisplay={form} />
      ) : (
        <ButtonsWrapper>
          <Button onClick={handleRegisterClick}>Sign up</Button>
          <Button onClick={handleLoginClick} secondary>
            Sign in
          </Button>
        </ButtonsWrapper>
      )}
    </Wrapper>
  );
};

export default LandingPage;
