import * as types from "../actions/types";

const initialState = {
  user: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case types.GET_USER_DATA:
      return {
        ...state,
        projects: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
