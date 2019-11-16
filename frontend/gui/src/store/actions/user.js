import {
  GET_USER,
  UPDATE_USER,
  USER_ERROR,
  USER_LOADING
} from "../actions/actionTypes";

import axios from "axios";
import { message } from "antd";

import { logout } from "./auth";
import store from "../index";

const countUserMoney = user => {
  user.user_amount = 0;

  user.wallets !== null &&
    user.wallets.map(
      wallet => (user.user_amount += parseFloat(wallet.wallet_amount))
    );
};

// Get user from server
export const getUser = (user = store.getState().user.user) => dispatch => {
  setLoading();

  axios
    .get(`http://127.0.0.1:8000/api/v1/users/${user.id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + JSON.parse(localStorage.getItem("user")).token
      }
    })
    .then(res => {
      const user = res.data;
      countUserMoney(user);

      message.success("Данные получены.");
      dispatch({
        type: GET_USER,
        payload: user
      });
    })
    .catch(error => {
      error.response !== undefined
        ? message.error(
            `Произошла ошибка ${error.response.status} ${error.response.statusText}! Повторите попытку позже.`,
            5
          )
        : message.error(
            `Произошла ошибка ${error.message} ! Повторите попытку позже.`,
            5
          );

      dispatch(logout());
      dispatch({
        type: USER_ERROR,
        payload: error.message
      });
    });
};

// update user
export const updateUser = user => dispatch => {
  setLoading();
  countUserMoney(user);

  dispatch({
    type: UPDATE_USER,
    payload: user
  });
};

// Set loading to true
export const setLoading = () => {
  return {
    type: USER_LOADING
  };
};
