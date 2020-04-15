export const ADD_CLIENT = 'ADD_CLIENT';
export const REMOVE_CLIENT = 'REMOVE_CLIENT';
// export const UPDATE_CLIENT = 'UPDATE_CLIENT';

const generateClientId = () =>
  Math.random()
    .toString(36)
    .substr(2, 9);

export const Clients = (state, action) => {
  switch (action.type) {
    case ADD_CLIENT:
      return [
        ...state,
        {
          ...action.payload,
          userID: generateClientId(),
        },
      ];
    case REMOVE_CLIENT:
      return state.filter(client => client.userID !== action.id);
    default:
      return state;
  }
};
