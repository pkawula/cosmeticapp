import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from 'routes';
import TopBar from 'components/organisms/TopBar/TopBar';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme/mainTheme';
import GlobalStyle from 'theme/GlobalStyle';
import Panel from 'views/Panel';

const Root = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <TopBar />
      <Switch>
        <Route exact path={routes.home} component={Panel} />
      </Switch>
    </ThemeProvider>
  </BrowserRouter>
);

export default Root;
