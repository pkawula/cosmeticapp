import React, { useState, useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';
import { ClientsContext } from 'contexts/Clients';
import PageTitle from 'components/atoms/PageTitle/PageTitle';
import { ReactComponent as MagnifierIcon } from 'images/icons/search.svg';
import { ReactComponent as PersonIcon } from 'images/person.svg';
import DeleteIcon from 'images/icons/delete_icon.svg';
import InputField from 'components/atoms/InputField/InputField';
import Button from 'components/atoms/Button/Button';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';

const Wrapper = styled.div`
  display: block;
  padding: 0.5em;
  margin: 0;
`;

const Section = styled.section`
  display: block;
  width: 100%;
`;

const SectionTitle = styled.h2`
  display: inline-block;
  padding: 0.2em 0.5em;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  color: ${({ theme }) => theme.light};
  background: #ff6f91;
`;

const SearchWrapper = styled.label`
  display: block;
  width: 100%;
  padding: 0 0.5em;
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  position: relative;
`;

const InputSearchField = styled(InputField)`
  display: block;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.m};

  & ~ span {
    top: 50%;
    transform: translate(0.5em, -50%);
  }

  &:focus ~ span,
  &:active ~ span,
  &:not([value='']) ~ span {
    transform: translate(0, -225%);
  }
`;

const StyledMagnifierIcon = styled(MagnifierIcon)`
  position: absolute;
  top: 50%;
  right: 1em;
  transform: translateY(-50%);
  max-width: ${({ theme }) => theme.fontSize.m};
  max-height: ${({ theme }) => theme.fontSize.m};
`;

const SearchResults = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  margin: 0;
  padding: 0;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 1em);
  height: auto;
  overflow-y: auto;
  list-style: none;
  background: ${({ theme }) => theme.light};
  border: none;
  border-bottom-right-radius: 0.5em;
  border-bottom-left-radius: 0.5em;
  z-index: 2;
  box-shadow: 2px 5px 10px -1px hsla(0, 0%, 0%, 0.2);

  transition: max-height 0.3s ease-in-out;

  ${({ isEmpty, focused }) =>
    isEmpty || focused
      ? css`
          max-height: 200px;
        `
      : css`
          max-height: 0;
        `};
`;

const Result = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 0.5em 1em;
  margin: 0;
  transition: opacity 0.2s ease;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.black};

  &:hover {
    opacity: 0.75;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const StyledPersonIcon = styled(PersonIcon)`
  display: inline-block;
  width: 2em;
  height: 2em;
  margin-right: 0.5em;
  border-radius: 50%;
`;

const StyledPersonImage = styled.img`
  display: inline-block;
  width: 2em;
  height: 2em;
  margin-right: 0.5em;
  border-radius: 50%;
  object-fit: cover;
`;

const PersonName = styled.span`
  display: inline-block;
  text-align: left;
  margin-left: 0.5em;
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.black};
`;

const ServicesContainer = styled.div`
  min-width: 100%;
  display: block;
  overflow-x: auto;
  white-space: nowrap;
  padding: 2em 0;
`;

const Service = styled.button`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSize.s};
  width: 4em;
  height: 4em;
  margin: 0.5em;
  padding: 0.5em;
  border: 2px dashed ${({ theme }) => theme.black};
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  box-shadow: 2px 5px 10px -1px hsla(0, 0%, 0%, 0.2);

  ${({ image }) =>
      image
        ? css`
            background-image: url(${image});
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 75%;
          `
        : css`
            background: hsl(0, 0%, 94%);
            &::before {
              content: '+';
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              line-height: 1;
              font-size: ${({ theme }) => theme.fontSize.l};
              font-weight: ${({ theme }) => theme.fontWeight.bold};
              text-align: center;
            }
          `}
    ::before {
    content: attr(data-label);
    width: fit-content;
    padding: 0.3em;
    font-size: ${({ theme }) => theme.fontSize.xs};
    color: ${({ theme }) => theme.light};
    text-align: center;
    background: hsla(0, 0%, 0%, 0.3);
    border-radius: 0.3em;
    position: absolute;
    top: -3em;
    left: 50%;
    transform: translateX(-50%) scale(0);
    transform-origin: bottom center;
    transition: transform 0.3s ease-in-out;
    z-index: 3;
  }

  &::after {
    content: '';
    position: absolute;
    top: -0.73em;
    left: 50%;
    border: 0.5em solid transparent;
    border-top-color: hsla(0, 0%, 0%, 0.3);
    transform: translateX(-50%) scale(0);
    transform-origin: center;
    transition: transform 0.3s ease-in-out;
  }

  &:hover::before,
  &:hover::after {
    transform: translateX(-50%) scale(1);
  }
`;

const ChosenServicesWrapper = styled.div`
  display: block;
  width: 100%;
  animation: slideInBottom 0.2s ease-in-out 1;

  @keyframes slideInBottom {
    from {
      transform: translateX(-50px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const ChosenServicesContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`;

const ChosenService = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  width: fit-content;
  margin: 1em 0.5em;
  padding: 0.5em 3em 0.5em 1em;
  box-shadow: 2px 2px 10px -1px hsla(0, 0%, 0%, 0.2);
  border-radius: 0.5em;
  position: relative;
  animation: slideInBottom 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1;

  @keyframes slideInBottom {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const DeselectService = styled(ButtonIcon)`
  display: block;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const ChosenServiceImage = styled.img`
  display: block;
  width: 3em;
  height: 3em;
  border-radius: 50%;
  background: transparent;
  margin-right: 0.5em;
  object-position: center center;
  object-fit: 80%;
`;

const ChosenServiceLabel = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontWeight.normal};
  color: ${({ theme }) => theme.black};
  margin-left: 0.5em;
  text-align: left;
  text-transform: capitalize;
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 1em;
  width: 100%;
  box-shadow: 3px 3px 10px -3px hsla(0, 0%, 0%, 0.2);
`;

const Date = styled.p`
  display: block;
  margin: 0;
  padding: 0;
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.black};
`;

const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimeButton = styled.button`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bolder};
  color: ${({ theme }) => theme.black};
  text-align: center;
  background: transparent;
  border: none;
  margin: 0;
  padding: 0 0.5em;
`;

const Time = styled.p`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.black};
  text-align: center;
  margin: 0;
  padding: 0;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2em auto;
`;

const StyledError = styled.p`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: ${({ theme }) => theme.fontWeight.bolder};
  color: ${({ theme }) => theme.cancel};
  text-align: left;
  text-transform: uppercase;
  margin: 0;
`;

const AddAppointment = () => {
  const { clients } = useContext(ClientsContext);
  const [inputValue, setInputValue] = useState('');
  const [services, setServices] = useState([]);
  const [chosenServices, chooseService] = useState([]);
  const [focused, setFocus] = useState(false);

  const setAllServices = () => {
    const getAllServices = () => {
      const allIcons = require.context('../images/icons/services', false, /.*\.svg$/);
      const icons = [];

      const addImage = async imageName => {
        const getUrl = await import(`images/icons/services/${imageName}.svg`);
        const url = getUrl.default;
        return Promise.resolve(url);
      };

      allIcons.keys().map(key => {
        const label = key.slice(key.indexOf('/') + 1, key.lastIndexOf('.'));
        return icons.push(label);
      });

      return icons.map(label => ({ label, iconUrl: addImage(label) }));
    };

    const allData = getAllServices().map(service =>
      service.iconUrl.then(url => ({
        label: service.label.replace('_', ' '),
        iconUrl: url,
        chosen: false,
      })),
    );
    const formattedData = Promise.all(allData)
      .then(data => setServices(data))
      .catch(err => console.log(err));
    return formattedData;
  };

  useEffect(() => {
    setAllServices();
  }, []);

  const handleUserInput = e => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleUserChoose = serviceLabel => {
    services.map(({ label, iconUrl }) => {
      if (label === serviceLabel) {
        const updatedServices = services.filter(service => service.label !== serviceLabel);
        setServices(updatedServices);
        return chooseService([...chosenServices, { label, iconUrl, chosen: true }]);
      }
      return null;
    });
  };

  const deselectService = serviceLabel => {
    chosenServices.map(({ label, iconUrl }) => {
      if (label === serviceLabel) {
        const selected = chosenServices.filter(service => service.label !== serviceLabel);
        chooseService(selected);
        return setServices([...services, { label, iconUrl, chosen: false }]);
      }
      return null;
    });
  };

  const handleSearch = (object, phrase) => {
    const keys = ['name', 'phone', 'email'];

    return keys.find(key => {
      return object[key].toLowerCase().includes(phrase.toLowerCase());
    });
  };

  return (
    <Wrapper>
      <PageTitle>make new appointment</PageTitle>
      <Section>
        <SectionTitle>Choose client</SectionTitle>
        <SearchWrapper>
          <InputSearchField
            type="text"
            placeholder="Search"
            name="searchbar"
            value={inputValue}
            onChange={e => handleUserInput(e)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
          <StyledMagnifierIcon />
          <SearchResults isEmpty={focused}>
            {clients &&
              clients
                .filter(client => handleSearch(client, inputValue))
                .map(({ name, image, clientID }) => (
                  <Result
                    key={clientID}
                    onClick={() => {
                      setInputValue(name);
                      setFocus(false);
                    }}
                  >
                    {image ? <StyledPersonImage src={image} /> : <StyledPersonIcon />}
                    <PersonName>{name}</PersonName>
                  </Result>
                ))}
          </SearchResults>
        </SearchWrapper>
      </Section>
      <Section>
        <SectionTitle>or add new one</SectionTitle>
        <Button to={routes.addClient} as={Link} style={{ display: 'block', width: 'fit-content' }}>
          Add new client
        </Button>
      </Section>
      <Section>
        <SectionTitle>choose a service</SectionTitle>
        <ServicesContainer>
          {services.length > 0 ? (
            services
              .filter(({ chosen }) => !chosen)
              .map(({ label, iconUrl }) => (
                <Service
                  key={label}
                  data-label={label}
                  image={iconUrl}
                  onClick={() => handleUserChoose(label)}
                />
              ))
          ) : (
            <StyledError>No services</StyledError>
          )}
        </ServicesContainer>
        {chosenServices.length > 0 && (
          <ChosenServicesWrapper>
            <SectionTitle>Chosen services</SectionTitle>
            <ChosenServicesContainer>
              {/* you have to set up a delete option to chosenService component */}
              {chosenServices.map(({ label, iconUrl }) => (
                <ChosenService key={label}>
                  <DeselectService src={DeleteIcon} onClick={() => deselectService(label)} />
                  <ChosenServiceImage src={iconUrl} />
                  <ChosenServiceLabel>{label}</ChosenServiceLabel>
                </ChosenService>
              ))}
            </ChosenServicesContainer>
          </ChosenServicesWrapper>
        )}
      </Section>
      <Section>
        <SectionTitle>select date</SectionTitle>
        <DateContainer>
          <Date>Wed, 20th May 2020</Date>
          <TimeContainer>
            <TimeButton>-</TimeButton>
            <Time>21:30</Time>
            <TimeButton>+</TimeButton>
          </TimeContainer>
        </DateContainer>
      </Section>
      <ButtonsContainer>
        <Button as={Link} to={routes.home} cancel="true">
          Cancel
        </Button>
        <Button>Save</Button>
      </ButtonsContainer>
    </Wrapper>
  );
};

export default AddAppointment;
