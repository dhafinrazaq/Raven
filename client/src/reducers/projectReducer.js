import {
  GET_PROJECTS,
  ADD_PROJECT,
  EDIT_PROJECT,
  DELETE_PROJECT,
  PROJECTS_LOADING,
  GET_PROJECT,
} from "../actions/types";

const initialState = {
  projects: [],
  loading: false,
  project: {},
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false,
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload
        ),
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects],
      };
    case EDIT_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects],
        project: action.payload,
      };
    case PROJECTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PROJECT:
      return {
        ...state,
        project: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
