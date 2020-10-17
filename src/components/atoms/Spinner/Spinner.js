import React from 'react';
import styled from 'styled-components';
import { ReactComponent as SpinnerIcon } from 'images/icons/loading_icon.svg';

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: spin 1s ease-in-out infinite;

  svg {
    width: 4em;
    height: 4em;
  }

  @keyframes spin {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

function Spinner() {
  return (
    <SpinnerWrapper>
      <SpinnerIcon />
    </SpinnerWrapper>
  );
}

export default Spinner;
