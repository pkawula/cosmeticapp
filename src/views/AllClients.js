import React, { useContext } from 'react';
import ClientCard from 'components/molecules/ClientCard/ClientCard';
import styled from 'styled-components';
import PageTitle from 'components/atoms/PageTitle/PageTitle';
import { routes } from 'routes';
import { Link } from 'react-router-dom';
import Button from 'components/atoms/Button/Button';
import { ClientsContext } from 'contexts/Clients';
import SearchBar from 'components/molecules/SearchBar/SearchBar';

const StyledWrapper = styled.div`
  display: block;
  margin: 0;
  padding: 1em;
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
`;

const AllClients = () => {
  const { clients } = useContext(ClientsContext);

  return (
    <StyledWrapper>
      <TopContainer>
        <PageTitle>All clients</PageTitle>
        <SearchBar />
      </TopContainer>
      <StyledCardContainer>
        {clients.length ? (
          clients.map(({ name, phone, email, image, clientID }) => (
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
