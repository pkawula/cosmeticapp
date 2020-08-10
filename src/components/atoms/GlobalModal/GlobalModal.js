import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import Button from '../Button/Button';

const Wrapper = styled.div`
  display: flex;
  width: 90%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 2em;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.light};
  border-radius: 0.5em;
  box-shadow: 3px 3px 10px -1px hsla(0, 0%, 0%, 0.6);
  animation: moveIn 0.3s ease-in-out 1;
  z-index: 999;

  @keyframes moveIn {
    0% {
      opacity: 0;
      transform: translate(-50%, -150%);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
`;

const Question = styled.h3`
  display: block;
  flex-basis: 100%;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin: 0.25em auto;
  text-align: center;
`;

const GlobalModal = ({ confirm, cancel }) => (
  <Wrapper>
    <Question>Are you sure?</Question>
    <Button onClick={confirm}>I&apos;m sure!</Button>
    <Button onClick={cancel} cancel>
      No, I&apos;m not
    </Button>
  </Wrapper>
);

GlobalModal.propTypes = {
  confirm: propTypes.func.isRequired,
  cancel: propTypes.func.isRequired,
};

export default GlobalModal;
