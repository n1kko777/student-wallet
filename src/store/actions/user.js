import axios from "axios";
import { endpointAPI } from "../constants";

import { GET_USER, UPDATE_USER, USER_ERROR, USER_LOADING } from "./actionTypes";

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
    .get(`${endpointAPI}/users/${user.id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + JSON.parse(localStorage.getItem("user")).token
      }
    })
    .then(res => {
      const user = res.data;
      countUserMoney(user);

      dispatch({
        type: GET_USER,
        payload: user
      });
    })
    .catch(error => {
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
