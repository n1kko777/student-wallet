import axios from "axios";
import {
  REGISTER_SUCCESS,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  REMIND_ME
} from "./actionTypes";

import { message } from "antd";

import { getUser } from "./user";
import { getOperations } from "./operations";

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

export const authSuccess = user => dispatch => {
  axios.defaults.headers.common["Authorization"] =
    "Token " + JSON.parse(localStorage.getItem("user")).token;

  dispatch(getUser(user));
  dispatch(getOperations());

  dispatch({
    type: AUTH_SUCCESS,
    payload: user
  });
};

export const registerSuccess = user => {
  message
    .success("Регистрация прошла успешно!")
    .then(() => message.info("Войдите в систему!"));

  return {
    type: REGISTER_SUCCESS,
    payload: user.key !== null
  };
};

export const authFail = error => dispatch => {
  error.response !== undefined
    ? message.error(
        `Произошла ошибка ${error.response.status} ${error.response.statusText}! Повторите попытку позже.`,
        10
      )
    : message.error(
        `Произошла ошибка ${error.message} ! Повторите попытку позже.`,
        10
      );

  dispatch({
    type: AUTH_FAIL,
    payload: error
  });
};

export const logout = () => {
  localStorage.removeItem("user");
  delete axios.defaults.headers.common["Authorization"];

  return {
    type: AUTH_LOGOUT
  };
};

export const authLogin = (username, password, isRemindMe) => {
  return dispatch => {
    dispatch(authStart());

    axios
      .post("https://studwallet.herokuapp.com/api/v1/api-token-auth/login/", {
        username: username,
        password: password
      })
      .then(res => {
        if (isRemindMe) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }

        dispatch(authSuccess(res.data));
      })
      .catch(err => dispatch(authFail(err)));
  };
};

export const authSignUp = (username, email, password1, password2) => {
  return dispatch => {
    dispatch(authStart());

    axios
      .post("https://studwallet.herokuapp.com/rest/auth/register/", {
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
