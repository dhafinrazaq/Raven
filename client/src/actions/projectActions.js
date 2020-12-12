import { GET_PROJECTS, ADD_PROJECT, DELETE_PROJECT } from "./types";

export const getProjects = () => {
  return {
    type: GET_PROJECTS,
  };
};

export const deleteProject = (id) => {
  return {
    type: DELETE_PROJECT,
    payload: id,
  };
};

export const addProject = (item) => {
  return {
    type: ADD_PROJECT,
    payload: item,
  };
};
