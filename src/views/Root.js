import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from 'routes';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme/mainTheme';
import GlobalStyle from 'theme/GlobalStyle';
import ClientsContextProvider from 'contexts/Clients';
import AppointmentsContextProvider from 'contexts/Appointments';
import TopBar from 'components/organisms/TopBar/TopBar';
import Panel from 'views/Panel';
import AddClient from './AddClient';
import AllClients from './AllClients';
import CalendarView from './CalendarView';
import MakeAppointment from './MakeAppointment';
import EditAppointment from './EditAppointment';
import ManageAppointments from './ManageAppointments';

const Root = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <TopBar />

      <ClientsContextProvider>
        <AppointmentsContextProvider>
          <Switch>
            <Route exact path={routes.home} component={Panel} />
            <Route path={routes.addClient} component={AddClient} />
            <Route path={routes.clients} component={AllClients} />
            <Route path={routes.calendar} component={CalendarView} />
            <Route exact path={routes.addAppointment} component={MakeAppointment} />
            <Route path={routes.editAppointment} component={EditAppointment} />
            <Route path={routes.manageAppointments} component={ManageAppointments} />
          </Switch>
        </AppointmentsContextProvider>
      </ClientsContextProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default Root;
