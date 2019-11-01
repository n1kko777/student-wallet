import axios from "axios";
import {
  REGISTER_SUCCESS,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  REMIND_ME
} from "./actionTypes";

export const remindMe = state => {
  return {
    type: REMIND_ME,
    payload: state
  };
};

export const authStart = () => {
  return {
    type: AUTH_START
  };
};

export const authSuccess = user => {
  return {
    type: AUTH_SUCCESS,
    payload: user
  };
};

export const registerSuccess = user => {
  return {
    type: REGISTER_SUCCESS,
    payload: user.key !== null
  };
};

export const authFail = error => {
  return {
    type: AUTH_FAIL,
    payload: error
  };
};

export const logout = () => {
  localStorage.removeItem("user");

  return {
    type: AUTH_LOGOUT
  };
};

export const authLogin = (username, password, isRemindMe) => {
  return dispatch => {
    dispatch(authStart());

    axios
      .post("http://127.0.0.1:8000/api/v1/api-token-auth/login/", {
        username: username,
        password: password
      })
      .then(res => {
        const user = res.data;

        if (isRemindMe) {
          localStorage.setItem("user", JSON.stringify(user));
        }

        dispatch(authSuccess(user));
      })
      .catch(err => dispatch(authFail(err)));
  };
};

export const authSignUp = (username, email, password1, password2) => {
  return dispatch => {
    dispatch(authStart());

    axios
      .post("http://127.0.0.1:8000/rest/auth/register/", {
        username: username,
        email: email,
        password1: password1,
        password2: password2
      })
      .then(res => {
        const user = res.data;

        dispatch(registerSuccess(user));
      })
      .catch(err => dispatch(authFail(err)));
  };
};

export const authCheckState = () => dispatch => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user === null) {
    dispatch(logout());
  } else {
    dispatch(authSuccess(user));
  }
};
