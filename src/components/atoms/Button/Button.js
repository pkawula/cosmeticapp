import styled, { css } from 'styled-components';
import propTypes from 'prop-types';

const Button = styled.button(
  ({ theme }) => css`
    font-family: inherit;
    display: inline-block;
    color: ${theme.light};
    background-color: ${theme.primary};
    font-weight: ${theme.fontWeight.bold};
    font-size: ${theme.fontSize.s};
    padding: 0.5em 1em;
    margin: 0.5em;
    border-radius: 10px;
    border: 3px solid transparent;
    box-shadow: 2px 2px 15px -4px hsla(0, 0%, 0%, 0.2);
    cursor: pointer;
    text-transform: uppercase;

    &:active {
      animation: tap 0.3s ease-in-out 1;

      @keyframes tap {
        from {
          transform: translate(0, 0);
        }
        to {
          transform: translate(3px, 3px);
        }
      }
    }

    ${({ secondary }) =>
      secondary &&
      css`
        color: ${theme.primary};
        background-color: ${theme.light};
        border-color: ${theme.primary};
      `};

    ${({ cancel }) =>
      cancel &&
      css`
        color: ${theme.light};
        background-color: ${theme.cancel};
        border-color: transparent;
      `};
  `,
);

Button.propTypes = {
  secondary: propTypes.bool,
  cancel: propTypes.bool,
};

Button.defaultProps = {
  secondary: false,
  cancel: false,
};

export default Button;
