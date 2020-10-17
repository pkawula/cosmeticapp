import { combineReducers } from 'redux';
import { v4 as uuid } from 'uuid';
// import { Clients as ClientsState, Appointments as AppointmentsState } from 'actions/index';

export const ADD_CLIENT = 'ADD_CLIENT';
export const REMOVE_CLIENT = 'REMOVE_CLIENT';
export const UPDATE_CLIENT = 'UPDATE_CLIENT';

export const ADD_APPOINTMENT = 'ADD_APPOINTMENT';
export const REMOVE_APPOINTMENT = 'REMOVE_APPOINTMENT';
export const UPDATE_APPOINTMENT = 'UPDATE_APPOINTMENT';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

// const initialClients = ClientsState.get();
// const initialAppointments = AppointmentsState.get();

const Clients = (state = [], action) => {
  switch (action.type) {
    case ADD_CLIENT:
      return [
        ...state,
        {
          ...action.payload,
          clientID: uuid(),
        },
      ];
    case REMOVE_CLIENT:
      return state.filter(client => client.clientID !== action.id);
    case UPDATE_CLIENT:
      return [
        ...state.filter(client => client.clientID !== action.payload.clientID),
        action.payload,
      ];
    default:
      return state;
  }
};

const Appointments = (state = [], action) => {
  switch (action.type) {
    case ADD_APPOINTMENT:
      return [
        ...state,
        {
          ...action.payload,
          ID: uuid(),
        },
      ];
    case REMOVE_APPOINTMENT:
      return state.filter(appointment => appointment.ID !== action.id);
    case UPDATE_APPOINTMENT:
      return [...state.filter(appointment => appointment.ID !== action.payload.ID), action.payload];
    default:
      return state;
  }
};

const User = (state = null, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return action.payload.user
        ? {
            email: action.payload.user.email,
            displayName: action.payload.user.displayName,
            uid: action.payload.user.uid,
          }
        : null;
    case LOGOUT_USER:
      return null;
    default:
      return state;
  }
};

const AppReducer = combineReducers({ clients: Clients, appointments: Appointments, user: User });

export default AppReducer;
