import * as types from "../actions/types";

const initialState = {
  isLoggedIn: false,
  user: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case types.GET_USER_DATA:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case types.GET_SPECIFIED_USER_DATA:
      return {
        ...state,
        userDetail: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
