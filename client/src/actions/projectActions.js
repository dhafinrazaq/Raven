import axios from "axios";
import {
  GET_PROJECTS,
  ADD_PROJECT,
  DELETE_PROJECT,
  PROJECTS_LOADING,
  GET_PROJECT,
  EDIT_PROJECT,
  SEARCH_PROJECTS,
} from "./types";

export const getProjects = () => (dispatch) => {
  dispatch(setProjectsLoading());
  axios.get("/api/projects").then((res) =>
    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    })
  );
};

export const deleteProject = (id) => (dispatch) => {
  axios
    .delete(`/api/projects/${id}`)
    .then((res) => dispatch({ type: DELETE_PROJECT, payload: id }));
};

export const addProject = (project) => (dispatch) => {
  axios.post("/api/projects", project).then((res) =>
    dispatch({
      type: ADD_PROJECT,
      payload: res.data,
    })
  );
};

export const setProjectsLoading = () => {
  return {
    type: PROJECTS_LOADING,
  };
};

export const getProject = (id) => (dispatch) => {
  dispatch(setProjectsLoading());
  axios.get(`/api/projects/${id}`).then((res) => {
    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  });
};

export const editProject = (id, project) => (dispatch) => {
  axios.put(`/api/projects/${id}`, project).then((res) => {
    dispatch({
      type: EDIT_PROJECT,
      payload: res.data,
    });
  });
};

export const getSearchProjects = (query) => (dispatch) => {
  axios.get(`/search/${query}`).then((res) =>
    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    })
  );
};
