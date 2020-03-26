import React from 'react';
import ClientCard from 'components/molecules/ClientCard/ClientCard';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 2em auto;
  padding: 1em;
`;

const AllClients = () => (
  <StyledWrapper>
    <ClientCard />
  </StyledWrapper>
);
export default AllClients;
