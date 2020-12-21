import axios from "axios";
import * as types from "./types";

export const signUp = (userFormData, resetState, setError) => (dispatch) => {
  axios
    .post("/api/users/signup", userFormData)
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
    .post("/api/users/signin", userFormData)
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
export const getAnyUserDataController = (username) => (dispatch) => {
  axios.get(`/api/users/${username}`).then((res) => {
    dispatch({
      type: types.GET_USER_DATA,
      payload: res.data,
    });
  });
};
