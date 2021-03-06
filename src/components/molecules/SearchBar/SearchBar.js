import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import SearchIcon from 'images/icons/search.svg';
import InputField from 'components/atoms/InputField/InputField';

const StyledWrapper = styled.label`
  margin-left: auto;
  margin-right: 0;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

const StyledImage = styled.img`
  width: 2.5em;
  height: 2.5em;
  object-fit: cover;
  object-position: center;
  position: absolute;
  padding: 0.5em;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
`;

const StyledInputField = styled(InputField)`
  padding: 0.5em;
  border-radius: ${({ theme }) => theme.fontSize.xs};
  border: 2px solid ${({ theme }) => theme.black};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  padding-right: 2.5em;

  &:not([value='']) {
    border-bottom-color: ${({ theme }) => theme.black};
  }

  & ~ span {
    transform: translate(0.5em, 1.7em);
  }
`;

const SearchBar = ({ onUserInput, value }) => {
  return (
    <StyledWrapper>
      <StyledInputField
        type="text"
        onChange={e => onUserInput(e)}
        value={value}
        placeholder="Search"
        name="searchbar"
      />
      <StyledImage src={SearchIcon} alt="Search" />
    </StyledWrapper>
  );
};

SearchBar.propTypes = {
  onUserInput: propTypes.func.isRequired,
  value: propTypes.string.isRequired,
};

export default SearchBar;
