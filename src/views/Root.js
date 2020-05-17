import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from 'routes';
import TopBar from 'components/organisms/TopBar/TopBar';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme/mainTheme';
import GlobalStyle from 'theme/GlobalStyle';
import Panel from 'views/Panel';
import ClientsContextProvider from 'contexts/Clients';
import AddClient from './AddClient';
import AllClients from './AllClients';
import CalendarView from './CalendarView';
import AddAppointment from './AddAppointment';

const Root = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <TopBar />

      <ClientsContextProvider>
        <Switch>
          <Route exact path={routes.home} component={Panel} />
          <Route path={routes.addClient} component={AddClient} />
          <Route path={routes.clients} component={AllClients} />
          <Route path={routes.calendar} component={CalendarView} />
          <Route path={routes.addAppointment} component={AddAppointment} />
        </Switch>
      </ClientsContextProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default Root;
