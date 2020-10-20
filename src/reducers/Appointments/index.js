import { v4 as uuid } from 'uuid';

export const ADD_APPOINTMENT = 'ADD_APPOINTMENT';
export const REMOVE_APPOINTMENT = 'REMOVE_APPOINTMENT';
export const UPDATE_APPOINTMENT = 'UPDATE_APPOINTMENT';

export const Appointments = (state, action) => {
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
