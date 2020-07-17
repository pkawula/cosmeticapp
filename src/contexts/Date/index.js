import React, { createContext, useReducer, useEffect } from 'react';
import propTypes from 'prop-types';
import { Date } from 'reducers/Date';

export const DateContext = createContext();

const DateContextProvider = ({ children }) => {
  const [date, dispatch] = useReducer(Date, [], () => {
    const localData = window.localStorage.getItem('clients');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {}, [date]);

  return <DateContext.Provider value={{ date, dispatch }}>{children}</DateContext.Provider>;
};

DateContextProvider.propTypes = {
  children: propTypes.oneOfType([propTypes.node, propTypes.element]).isRequired,
};

export default DateContextProvider;
