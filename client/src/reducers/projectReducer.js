import { bindActionCreators } from "redux";
import { v4 as uuid } from "uuid";
import { GET_PROJECTS, ADD_PROJECT, DELETE_PROJECT } from "../actions/types";

const initialState = {
  projects: [
    { id: uuid(), name: "trackr" },
    { id: uuid(), name: "trackr2" },
    { id: uuid(), name: "trackr3" },
  ],
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.id !== action.payload
        ),
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects],
      };
    default:
      return state;
  }
};

export default reducer;
