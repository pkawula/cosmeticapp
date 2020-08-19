import React from 'react';
import Helmet from 'react-helmet';
import propTypes from 'prop-types';
import styled, { css } from 'styled-components';

const TitleHeading = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.fontSize.xs};
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.black};
    text-transform: uppercase;
    margin: 0.5em 0;
  `}
`;

const PageTitle = ({ children }) => (
  <>
    <Helmet>
      <title>{children} - CosmeticApp</title>
    </Helmet>
    <TitleHeading>{children}</TitleHeading>
  </>
);

PageTitle.propTypes = {
  children: propTypes.string.isRequired,
};

export default PageTitle;
