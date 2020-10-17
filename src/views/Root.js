import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme/mainTheme';
import { Provider } from 'react-redux';
import { store } from 'store';
import GlobalStyle from 'theme/GlobalStyle';
import Main from './Main';

const Root = () => (
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Main />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);

export default Root;
