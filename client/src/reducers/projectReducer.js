import * as types from "../actions/types";

const initialState = {
  projects: [],
  loading: false,
  project: {},
  img: {},
  imageSrc: "",
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case types.GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false,
        project: {},
        imageSrc: "",
      };
    case types.DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload
        ),
      };
    case types.ADD_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects],
      };
    case types.EDIT_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects],
        project: action.payload,
      };
    case types.PROJECTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.GET_PROJECT:
      return {
        ...state,
        project: action.payload,
        loading: false,
      };
    case types.EDIT_PROJECT_IMAGE:
      return {
        ...state,
        project: action.payload,
        loading: false,
      };
    case types.UPDATE_PROJECT_IMAGE_SRC:
      return {
        ...state,
        imageSrc: action.imageSrc,
      };
    case types.SEARCH_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false,
        project: {},
        imageSrc: "",
      };
    case types.EDIT_PROJECT_IMAGE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case types.CLEAR_PROJECT_ERROR:
      return {
        ...state,
        error: "",
      };
    case types.ADD_JOIN_APPLICATION:
      return {
        ...state,
      };
    case types.ADD_JOIN_APPLICATION_ERROR:
      return {
        ...state,
        error: "Unable to apply for this project",
      };
    case types.GET_JOIN_APPLICATIONS:
      return {
        ...state,
        joinApplicationList: action.payload,
      };
    case types.GET_JOIN_APPLICATION:
      return {
        ...state,
        joinApplication: action.payload,
      };
    case types.GET_PROJECT_COLLABORATORS:
      return {
        ...state,
        collaborators: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
