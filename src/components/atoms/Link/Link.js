import styled from 'styled-components';

const Link = styled.a`
  display: inline;
  margin: 0;
  padding: 0;
  text-decoration: none;
  color: ${({ theme }) => theme.black};
  font-size: inherit;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export default Link;
