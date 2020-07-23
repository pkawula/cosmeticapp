import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

const Wrapper = styled.div`
  display: inline-block;
  animation: FadeInDown 0.3s 1 cubic-bezier(0, 0, 0.5, 2);
  border-radius: 0.5em;
  background: #f0f0f0;
  box-shadow: 3px 3px 10px -3px hsla(0, 0%, 0%, 0.2);
  position: absolute;
  top: 2em;
  left: 0;

  @keyframes FadeInDown {
    from {
      transform: translateY(-3em);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const Modal = ({ toggleModal, children }) => {
  const modalRef = useRef(null);

  const useModalRef = ref => {
    useEffect(() => {
      const handleClickOutside = e => {
        if (ref.current && !ref.current.contains(e.target)) {
          toggleModal();
        }
      };

      document.addEventListener('mousedown', e => handleClickOutside(e));
      document.addEventListener('touchdown', e => handleClickOutside(e));
      return () => {
        document.removeEventListener('mousedown', e => handleClickOutside(e));
        document.removeEventListener('touchdown', e => handleClickOutside(e));
      };
    });
  };

  useModalRef(modalRef);

  return <Wrapper ref={modalRef}>{children}</Wrapper>;
};

Modal.propTypes = {
  toggleModal: propTypes.func.isRequired,
  children: propTypes.oneOfType([propTypes.node, propTypes.element]).isRequired,
};

export default Modal;
