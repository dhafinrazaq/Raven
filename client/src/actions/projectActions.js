import axios from "axios";
import {
  GET_PROJECTS,
  ADD_PROJECT,
  DELETE_PROJECT,
  PROJECTS_LOADING,
  GET_PROJECT,
  EDIT_PROJECT,
  SEARCH_PROJECTS,
  EDIT_PROJECT_IMAGE,
  UPDATE_PROJECT_IMAGE_SRC,
  EDIT_PROJECT_IMAGE_ERROR,
  CLEAR_PROJECT_ERROR,
  ADD_JOIN_APPLICATION,
  ADD_JOIN_APPLICATION_ERROR,
} from "./types";
import { getImgSource } from "../helpers/imageProcessing";

export const getProjects = () => async (dispatch) => {
  dispatch(setProjectsLoading());
  await axios.get("/api/projects").then((res) =>
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

export const getProject = (id) => async (dispatch) => {
  dispatch(setProjectsLoading());
  await axios.get(`/api/projects/${id}`).then((res) => {
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
  axios.get(`/api/search/${query}`).then((res) =>
    dispatch({
      type: SEARCH_PROJECTS,
      payload: res.data,
    })
  );
};
export const editProjectImage = (project) => async (dispatch) => {
  await axios
    .post(`/api/projects/upload`, project)
    .then((res) => {
      dispatch({
        type: EDIT_PROJECT_IMAGE,
        payload: res.data,
      });
    })
    .catch((err, res) => {
      dispatch({
        type: EDIT_PROJECT_IMAGE_ERROR,
        payload: err.response.data.msg,
      });
    });
};

export const updateProjectImageSrc = (id) => async (dispatch) => {
  await axios.get(`/api/projects/${id}`).then((res) => {
    dispatch({
      type: UPDATE_PROJECT_IMAGE_SRC,
      imageSrc: getImgSource(res.data.img),
    });
  });
};

export const clearProjectError = (id) => async (dispatch) => {
  dispatch({
    type: CLEAR_PROJECT_ERROR,
  });
};

export const addJoinApplication = (id, application) => (dispatch) => {
  console.log("here");
  axios
    .post(`/api/projects/${id}/join`, application)
    .then((res) => {
      dispatch({
        type: ADD_JOIN_APPLICATION,
        payload: res.data,
      });
    })
    .catch((err, res) => {
      dispatch({
        type: ADD_JOIN_APPLICATION_ERROR,
        payload: err.response.data.msg,
      });
    });
};
