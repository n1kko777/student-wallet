import axios from "axios";
import { endpointAPI } from "../constants";

import {
  GET_WALLETS,
  WALLET_LOADING,
  WALLETS_ERROR,
  ADD_WALLET,
  DELETE_WALLET,
  WALLET_CURRENT,
  WALLET_CLEAR_CURRENT,
  UPDATE_WALLET,
  SEARCH_WALLETS
} from "./actionTypes";

import { message } from "antd";

import { getUser } from "./user";
import { logout } from "./auth";

// Get wallets from server
export const getWallets = () => dispatch => {
  setLoading();

  axios
    .get(`${endpointAPI}/wallets/`)
    .then(res => {
      dispatch({
        type: GET_WALLETS,
        payload: res.data.reverse()
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

      dispatch({
        type: WALLETS_ERROR,
        payload: error.message
      });

      dispatch(logout());
    });
};

// Add wallet
export const addWallet = wallet => dispatch => {
  setLoading();
  axios
    .post(`${endpointAPI}/wallets/`, {
      wallet_amount: wallet.wallet_amount,
      wallet_name: wallet.wallet_name,
      wallet_color: wallet.wallet_color
    })
    .then(res => {
      message.success("Запись создана.");
      dispatch({
        type: ADD_WALLET
      });
      dispatch(getUser());
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

      dispatch({
        type: WALLETS_ERROR,
        payload: error.message
      });
    });
};

// Delete wallet from server
export const deleteWallet = id => dispatch => {
  setLoading();

  axios
    .delete(`${endpointAPI}/wallets/${id}/`)
    .then(res => {
      message.success("Запись удалена.");

      dispatch({
        type: DELETE_WALLET,
        payload: id
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

      dispatch({
        type: WALLETS_ERROR,
        payload: error.message
      });
    });
};

// Update wallet on server
export const updateWallet = wallet => dispatch => {
  setLoading();
  axios
    .put(`${endpointAPI}/wallets/${wallet.id}/`, {
      wallet_amount: wallet.wallet_amount,
      wallet_name: wallet.wallet_name,
      wallet_color: wallet.wallet_color
    })
    .then(res => {
      dispatch({
        type: UPDATE_WALLET
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

      dispatch({
        type: WALLETS_ERROR,
        payload: error.message
      });
    });
};

// Search wallets
export const searchWallets = text => dispatch => {
  try {
    setLoading();

    const res = fetch(`/wallets?q=${text}`);
    const data = res.json();

    dispatch({
      type: SEARCH_WALLETS,
      payload: data
    });
  } catch (error) {
    message.error(
      `Произошла ошибка ${error.response.status} ${error.response.statusText}! Повторите попытку позже.`
    );

    dispatch({
      type: WALLETS_ERROR,
      payload: error.message
    });
  }
};

// Set current wallet
export const setCurrent = wallet => {
  return {
    type: WALLET_CURRENT,
    payload: wallet
  };
};

// Clear current wallet
export const clearCurrent = () => {
  return {
    type: WALLET_CLEAR_CURRENT
  };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: WALLET_LOADING
  };
};
