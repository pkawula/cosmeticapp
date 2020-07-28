import React, { createContext, useReducer, useEffect } from 'react';
import propTypes from 'prop-types';
import { Appointments } from 'reducers/Appointments';

export const AppointmentsContext = createContext();

const AppointmentsContextProvider = ({ children }) => {
  const [appointments, dispatch] = useReducer(Appointments, [], () => {
    const localData = window.localStorage.getItem('appointments');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    window.localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  return (
    <AppointmentsContext.Provider value={{ appointments, dispatch }}>
      {children}
    </AppointmentsContext.Provider>
  );
};

AppointmentsContextProvider.propTypes = {
  children: propTypes.oneOfType([propTypes.node, propTypes.element]).isRequired,
};

export default AppointmentsContextProvider;
