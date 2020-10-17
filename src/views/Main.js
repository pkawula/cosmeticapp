import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { routes } from 'routes';
import ClientsContextProvider from 'contexts/Clients';
import AppointmentsContextProvider from 'contexts/Appointments';
import { LOGIN_USER, LOGOUT_USER } from 'reducers/AppReducer';
import TopBar from 'components/organisms/TopBar/TopBar';
import LandingPage from 'pages/Landing/Landing';
import Panel from 'views/Panel';
import Spinner from 'components/atoms/Spinner/Spinner';
import { auth } from '../firebase';
import AddClient from './AddClient';
import AllClients from './AllClients';
import CalendarView from './CalendarView';
import MakeAppointment from './MakeAppointment';
import EditAppointment from './EditAppointment';
import ManageAppointments from './ManageAppointments';

const Main = ({ logInUser, logOutUser, user }) => {
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const authUser = auth.onAuthStateChanged(userData => {
      setIsLoadingUser(false);
      logInUser(userData);
    });

    return authUser;
  }, [logInUser, logOutUser]);

  return (
    <>
      {isLoadingUser ? (
        <Spinner />
      ) : (
        <>
          {user !== null ? (
            <>
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
            </>
          ) : (
            <Switch>
              <Route exact path={routes.home}>
                <LandingPage />
              </Route>
              <Route path={routes.login}>
                <LandingPage displayForm="login" />
              </Route>
              <Route path={routes.register}>
                <LandingPage displayForm="register" />
              </Route>
            </Switch>
          )}
        </>
      )}
    </>
  );
};

Main.propTypes = {
  logInUser: PropTypes.func.isRequired,
  logOutUser: PropTypes.func.isRequired,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Main.defaultProps = {
  user: null,
};

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = dispatch => ({
  logInUser: user =>
    dispatch({
      type: LOGIN_USER,
      payload: {
        user,
      },
    }),
  logOutUser: () => dispatch({ type: LOGOUT_USER }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
