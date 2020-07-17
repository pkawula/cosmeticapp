export const GET_DAY = 'GET_DAY';

export const Date = (state, action) => {
  switch (action.type) {
    case GET_DAY:
      return [
        ...state,
        {
          ...action.payload,
        },
      ];
    default:
      return state;
  }
};
