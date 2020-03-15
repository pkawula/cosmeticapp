import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from 'routes';
import TopBar from 'components/organisms/TopBar';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme/mainTheme';
import GlobalStyle from 'theme/GlobalStyle';

const Root = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <BrowserRouter>
      <Switch>
        <TopBar />
        <Route exact path={routes.home} />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>
);

export default Root;
