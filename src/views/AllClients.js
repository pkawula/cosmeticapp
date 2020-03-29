import React from 'react';
import ClientCard from 'components/molecules/ClientCard/ClientCard';
import styled from 'styled-components';
import PageTitle from 'components/atoms/PageTitle/PageTitle';
import { Clients } from 'actions';

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

class AllClients extends React.Component {
  state = { clients: null };

  componentDidMount() {
    const savedClients = JSON.parse(Clients.get());

    this.setState({ clients: savedClients });
  }

  render() {
    const { clients } = this.state;

    return (
      <StyledWrapper>
        <PageTitle>All clients</PageTitle>
        <StyledCardContainer>
          {clients ? (
            clients.map(({ name, phone, email, image, userID }) => (
              <ClientCard
                key={userID}
                name={name}
                phone={phone}
                email={email}
                image={image}
                userID={userID}
              />
            ))
          ) : (
            <p>No clients yet</p>
          )}
        </StyledCardContainer>
      </StyledWrapper>
    );
  }
}
export default AllClients;
