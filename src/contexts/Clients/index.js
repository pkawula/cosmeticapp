import React, { createContext, useReducer, useEffect } from 'react';
import propTypes from 'prop-types';
import { Clients } from 'reducers/Clients';

export const ClientsContext = createContext();

const ClientsContextProvider = ({ children }) => {
  const [clients, dispatch] = useReducer(Clients, [], () => {
    const localData = window.localStorage.getItem('clients');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    window.localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  return (
    <ClientsContext.Provider value={{ clients, dispatch }}>{children}</ClientsContext.Provider>
  );
};

ClientsContextProvider.propTypes = {
  children: propTypes.oneOfType([propTypes.node, propTypes.element]).isRequired,
};

export default ClientsContextProvider;
