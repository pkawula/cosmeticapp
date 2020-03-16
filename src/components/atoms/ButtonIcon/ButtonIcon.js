import styled from 'styled-components';

const ButtonIcon = styled.button`
  display: inline-block;
  padding: 0.5em;
  background: transparent;
  background-image: url(${({ src }) => src});
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: 70%;
  border-radius: 50%;
  width: 3em;
  height: 3em;
  border: none;
  margin: 0 0.5em;
  cursor: pointer;
`;

export default ButtonIcon;
