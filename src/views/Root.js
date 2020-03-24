import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from 'routes';
import TopBar from 'components/organisms/TopBar/TopBar';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme/mainTheme';
import GlobalStyle from 'theme/GlobalStyle';
import Panel from 'views/Panel';
import AddClient from './AddClient';
import Clients from './Clients';

const Root = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <TopBar />
      <Switch>
        <Route exact path={routes.home} component={Panel} />
        <Route path={routes.addClient} component={AddClient} />
        <Route path={routes.clients} component={Clients} />
      </Switch>
    </ThemeProvider>
  </BrowserRouter>
);

export default Root;
