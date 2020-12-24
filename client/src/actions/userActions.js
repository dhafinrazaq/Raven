import axios from "axios";
import * as types from "./types";
import backendURI from "../../config";

export const signUp = (userFormData, resetState, setError) => (dispatch) => {
  axios
    .post(`${backendURI}/api/users/signup`, userFormData)
    .then((res) => {
      dispatch({
        type: types.SET_USER,
        payload: res.data,
      });
      resetState();
      window.location.href = "/";
    })
    .catch((err) => {
      setError(err.response.data);
    });
};

export const signIn = (userFormData, resetState, setError) => (dispatch) => {
  axios
    .post(`${backendURI}/api/users/signin`, userFormData)
    .then((res) => {
      dispatch({
        type: types.SET_USER,
        payload: res.data,
      });
      resetState();

      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    })
    .catch((err) => {
      setError(err.response.data);
    });
};

export const getSpecifiedUserDataController = (username) => (dispatch) => {
  axios.get(`${backendURI}/api/users/${username}`).then((res) => {
    dispatch({
      type: types.GET_SPECIFIED_USER_DATA,
      payload: res.data,
    });
  });
};

export const signOut = (resetState) => (dispatch) => {
  axios.post(`${backendURI}/api/users/signout`, {}).then((res) => {
    if (window.location.pathname !== "/") {
      window.location.href = "/";
    }

    resetState();
  });
};

export const fetchUserData = () => async (dispatch) => {
  await axios
    .get(`${backendURI}/api/users/data`)
    .then((res) => {
      dispatch({
        type: types.GET_USER_DATA,
        payload: res.data,
      });
    })
    .catch((err) => {
      // if (shouldLogOut) {
      // if (window.location.pathname !== "/account") {
      //   window.location.href = "/account";
      // }
      // }
    });
};
