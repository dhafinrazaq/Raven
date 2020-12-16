import axios from "axios";
import * as types from "./types";

export const signUp = (userFormData, displayError) => (dispatch) => {
  axios
    .post("/api/users/signup", userFormData)
    .then((res) => {
      dispatch({
        type: types.SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      displayError(err.response.data);
    });
};

export const signIn = (userFormData, displayError) => (dispatch) => {
  axios
    .post("/api/users/signin", userFormData)
    .then((res) => {
      dispatch({
        type: types.SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      displayError(err.response.data);
    });
};
