import React, { useState } from 'react';
import styled from 'styled-components';
import { routes } from 'routes';
import { useFirestore } from 'utils/utils';
import { Link } from 'react-router-dom';
import ClientCard from 'components/molecules/ClientCard/ClientCard';
import PageTitle from 'components/atoms/PageTitle/PageTitle';
import Button from 'components/atoms/Button/Button';
import SearchBar from 'components/molecules/SearchBar/SearchBar';

const StyledWrapper = styled.div`
  display: block;
  margin: 0;
  padding: 1em 0.5em 0 0.5em;
  border-radius: 1em 1em 0;
  background: ${({ theme }) => theme.light};
`;

const StyledCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: auto;

  @media screen and (max-width: 567px) {
    align-items: center;
  }
`;

const StyledInfo = styled.p`
  text-align: left;
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.black};
  opacity: 0.6;
  text-transform: uppercase;
  margin: 1em 0;
  display: block;
  width: 100%;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -0.5em;
`;

const AllClients = () => {
  const [searchedValue, setValue] = useState('');
  const clients = useFirestore('clients');

  const searchClient = (object, phrase) => {
    const keys = ['name', 'phone', 'email'];

    return keys.find(key => {
      return object[key].toLowerCase().includes(phrase.toLowerCase());
    });
  };

  const onUserInput = e => {
    const searchedPhrase = e.target.value;
    setValue(searchedPhrase);
  };

  return (
    <StyledWrapper>
      <TopContainer>
        <PageTitle>All clients</PageTitle>
        <SearchBar onUserInput={onUserInput} value={searchedValue} />
      </TopContainer>
      <StyledCardContainer>
        {clients.length ? (
          clients
            .filter(client => searchClient(client, searchedValue))
            .map(({ name, phone, email, image, clientID }) => (
              <ClientCard
                key={clientID}
                name={name}
                phone={phone}
                email={email}
                image={image}
                clientID={clientID}
              />
            ))
        ) : (
          <>
            <StyledInfo>No clients yet</StyledInfo>
            <Button as={Link} to={routes.addClient}>
              Add first client
            </Button>
          </>
        )}
      </StyledCardContainer>
    </StyledWrapper>
  );
};

export default AllClients;
