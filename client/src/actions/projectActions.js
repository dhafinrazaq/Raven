import axios from "axios";
import * as types from "./types";
import { getImgSource } from "../helpers/imageProcessing";

export const getProjects = () => async (dispatch) => {
  dispatch(setProjectsLoading());
  await axios.get("/api/projects").then((res) =>
    dispatch({
      type: types.GET_PROJECTS,
      payload: res.data,
    })
  );
};

export const deleteProject = (id) => (dispatch) => {
  axios
    .delete(`/api/projects/${id}`)
    .then((res) => dispatch({ type: types.DELETE_PROJECT, payload: id }));
};

export const addProject = (project) => (dispatch) => {
  axios.post("/api/projects", project).then((res) =>
    dispatch({
      type: types.ADD_PROJECT,
      payload: res.data,
    })
  );
};

export const setProjectsLoading = () => {
  return {
    type: types.PROJECTS_LOADING,
  };
};

export const getProject = (id) => async (dispatch) => {
  dispatch(setProjectsLoading());
  await axios.get(`/api/projects/${id}`).then((res) => {
    dispatch({
      type: types.GET_PROJECT,
      payload: res.data,
    });
  });
};

export const editProject = (id, project) => (dispatch) => {
  axios.put(`/api/projects/${id}`, project).then((res) => {
    dispatch({
      type: types.EDIT_PROJECT,
      payload: res.data,
    });
  });
};

export const getSearchProjects = (query) => (dispatch) => {
  axios.get(`/api/search/${query}`).then((res) =>
    dispatch({
      type: types.SEARCH_PROJECTS,
      payload: res.data,
    })
  );
};
export const editProjectImage = (project) => async (dispatch) => {
  await axios
    .post(`/api/projects/upload`, project)
    .then((res) => {
      dispatch({
        type: types.EDIT_PROJECT_IMAGE,
        payload: res.data,
      });
    })
    .catch((err, res) => {
      dispatch({
        type: types.EDIT_PROJECT_IMAGE_ERROR,
        payload: err.response.data.msg,
      });
    });
};

export const updateProjectImageSrc = (id) => async (dispatch) => {
  await axios.get(`/api/projects/${id}`).then((res) => {
    dispatch({
      type: types.UPDATE_PROJECT_IMAGE_SRC,
      imageSrc: getImgSource(res.data.img),
    });
  });
};

export const clearProjectError = (id) => async (dispatch) => {
  dispatch({
    type: types.CLEAR_PROJECT_ERROR,
  });
};

export const addJoinApplication = (id, application) => (dispatch) => {
  axios
    .post(`/api/projects/${id}/join`, application)
    .then((res) => {
      dispatch({
        type: types.ADD_JOIN_APPLICATION,
        payload: res.data,
      });
    })
    .catch((err, res) => {
      dispatch({
        type: types.ADD_JOIN_APPLICATION_ERROR,
        payload: err.response.data.msg,
      });
    });
};

export const getProjectJoinApplicationList = (projectId) => (dispatch) => {
  axios
    .get(`/api/projects/${projectId}/join`)
    .then((res) => {
      dispatch({
        type: types.GET_JOIN_APPLICATIONS,
        payload: res.data,
      });
    })
    .catch((err, res) => {
      dispatch({
        type: types.GET_JOIN_APPLICATIONS_ERROR,
        payload: err.response.data.msg,
      });
    });
};

export const getProjectJoinApplication = (projectId, joinId) => (dispatch) => {
  axios
    .get(`/api/projects/${projectId}/join/${joinId}`)
    .then((res) => {
      dispatch({
        type: types.GET_JOIN_APPLICATION,
        payload: res.data,
      });
    })
    .catch((err, res) => {
      dispatch({
        type: types.GET_JOIN_APPLICATION_ERROR,
        payload: err.response.data.msg,
      });
    });
};

export const acceptProjectJoinApplication = (projectId, joinId) => (
  dispatch
) => {
  axios
    .post(`/api/projects/${projectId}/join/${joinId}/accept`)
    .then((res) => {
      dispatch({
        type: types.ACCEPT_JOIN_APPLICATION,
        payload: res.data,
      });
    })
    .catch((err, res) => {
      dispatch({
        type: types.ACCEPT_JOIN_APPLICATION_ERROR,
        payload: err.response.data.msg,
      });
    });
};

export const getProjectCollaborators = (projectId) => (dispatch) => {
  axios
    .get(`/api/projects/${projectId}/collaborators`)
    .then((res) => {
      console.log("get");
      dispatch({
        type: types.GET_PROJECT_COLLABORATORS,
        payload: res.data,
      });
    })
    .catch((err, res) => {
      dispatch({
        type: types.GET_PROJECT_COLLABORATORS_ERROR,
        payload: err.response.data.msg,
      });
    });
};
