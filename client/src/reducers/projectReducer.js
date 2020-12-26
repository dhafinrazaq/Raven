import {
  GET_PROJECTS,
  ADD_PROJECT,
  EDIT_PROJECT,
  DELETE_PROJECT,
  PROJECTS_LOADING,
  GET_PROJECT,
  SEARCH_PROJECTS,
  EDIT_PROJECT_IMAGE,
  UPDATE_PROJECT_IMAGE_SRC,
} from "../actions/types";

const initialState = {
  projects: [],
  loading: false,
  project: {},
  img: {},
  imageSrc: "",
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false,
        project: {},
        imageSrc: "",
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
    case EDIT_PROJECT_IMAGE:
      return {
        ...state,
        project: action.payload,
        loading: false,
      };
    case UPDATE_PROJECT_IMAGE_SRC:
      return {
        ...state,
        imageSrc: action.imageSrc,
      };
    case SEARCH_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false,
        project: {},
        imageSrc: "",
      };
    default:
      return state;
  }
};

export default reducer;
