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

      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    })
    .catch((err) => {
      setError(err.response.data);
    });
};

export const signOut = (resetState) => (dispatch) => {
  axios.post("/api/users/signout", {}).then((res) => {
    if (window.location.pathname !== "/") {
      window.location.href = "/";
    }

    resetState();
  });
};

export const fetchUserData = () => async (dispatch) => {
  await axios
    .get("/api/users/data")
    .then((res) => {
      dispatch({
        type: types.GET_USER_DATA,
        payload: res.data,
      });
    })
    .catch((err) => {
      // if (shouldLogOut) {
      if (window.location.pathname !== "/account") {
        window.location.href = "/account";
      }
      // }
    });
};
