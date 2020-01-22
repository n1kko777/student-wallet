import axios from "axios";
import { url, endpointAPI } from "../constants";

import moment from "moment";

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
import { getOperations, updatePeriod } from "./operations";
import { Redirect } from "react-router-dom";

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
  message.success("Регистрация прошла успешно!");

  return {
    type: REGISTER_SUCCESS,
    payload: user.key !== null
  };
};

export const authFail = error => dispatch => {
  if (error.response) {
    // The request was made and the server responded with a status code
    const keys = [];

    for (const k in error.response.data) keys.push(k);

    message.error(
      `Код ошибки: ${error.response.status}. ${
        error.response.data[keys[0]]
      } Повторите попытку позже.`,
      10
    );
  } else if (error.request) {
    // The request was made but no response was received
    message.error(
      "Не удалось соединиться с сервером. Повторите попытку позже.",
      10
    );
  } else {
    // Something happened in setting up the request that triggered an Error
    message.error("Что-то пошло не так... Повторите попытку позже.", 10);
  }

  dispatch({
    type: AUTH_FAIL,
    payload: error
  });
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("periodData");
  delete axios.defaults.headers.common["Authorization"];

  Redirect("/");
  return {
    type: AUTH_LOGOUT
  };
};

export const authLogin = (username, password, isRemindMe) => {
  return dispatch => {
    dispatch(authStart());

    axios
      .post(`${endpointAPI}/api-token-auth/login/`, {
        username: username,
        password: password
      })
      .then(res => {
        if (isRemindMe) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }

        dispatch(authSuccess(res.data));
      })
      .catch(error => dispatch(authFail(error)));
  };
};

export const authSignUp = (username, email, password1, password2) => {
  return dispatch => {
    dispatch(authStart());

    axios
      .post(`${url}/rest-auth/registration/`, {
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
  const periodData = JSON.parse(localStorage.getItem("periodData"));

  if (user === null) {
    dispatch(logout());
  } else {
    dispatch(authSuccess(user));
    if (periodData !== null) {
      dispatch(
        updatePeriod(periodData.period, moment(periodData.period_start))
      );
    } else {
      dispatch(updatePeriod("Месяц", moment().startOf("month")));
    }
  }
};
