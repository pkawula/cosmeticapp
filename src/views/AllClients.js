import React from 'react';
import ClientCard from 'components/molecules/ClientCard/ClientCard';
import styled from 'styled-components';
import PageTitle from 'components/atoms/PageTitle/PageTitle';
import { Clients } from 'actions';
import { routes } from 'routes';
import { Link } from 'react-router-dom';
import Button from 'components/atoms/Button/Button';

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

  @media screen and (max-width: 768px) {
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
          {clients || clients === [null] ? (
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
  }
}
export default AllClients;
