import styled, { css } from 'styled-components';

const PageTitle = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.fontSize.xs};
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.black};
    text-transform: uppercase;
    margin: 0.5em 0;
  `}
`;

export default PageTitle;
