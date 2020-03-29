import React from 'react';
import ClientCard from 'components/molecules/ClientCard/ClientCard';
import styled from 'styled-components';
import PageTitle from 'components/atoms/PageTitle/PageTitle';

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
  margin: 2em auto;
`;

const AllClients = () => (
  <StyledWrapper>
    <PageTitle>All clients</PageTitle>
    <StyledCardContainer>
      <ClientCard topCustomer />
      <ClientCard />
      <ClientCard />
      <ClientCard />
      <ClientCard />
      <ClientCard topCustomer />
      <ClientCard />
      <ClientCard />
      <ClientCard />
    </StyledCardContainer>
  </StyledWrapper>
);
export default AllClients;
