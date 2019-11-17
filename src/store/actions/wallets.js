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

import axios from "axios";
import { message } from "antd";

import { getUser } from "./user";
import { logout } from "./auth";

// Get wallets from server
export const getWallets = () => dispatch => {
  setLoading();

  axios
    .get("https://studwallet.herokuapp.com/api/v1/wallets/")
    .then(res => {
      const wallets = res.data;

      dispatch({
        type: GET_WALLETS,
        payload: wallets
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
    .post(`https://studwallet.herokuapp.com/api/v1/wallets/`, {
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
      error.response !== undefined
        ? message.error(
            `Произошла ошибка ${error.response.status} ${error.response.statusText}! Повторите попытку позже.`,
            5
          )
        : message.error(
            `Произошла ошибка ${error.message} ! Повторите попытку позже.`,
            5
          );

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
    .delete(`https://studwallet.herokuapp.com/api/v1/wallets/${id}/`)
    .then(res => {
      message.success("Запись удалена.");

      dispatch({
        type: DELETE_WALLET,
        payload: id
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
    .put(`https://studwallet.herokuapp.com/api/v1/wallets/${wallet.id}/`, {
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
      error.response !== undefined
        ? message.error(
            `Произошла ошибка ${error.response.status} ${error.response.statusText}! Повторите попытку позже.`,
            5
          )
        : message.error(
            `Произошла ошибка ${error.message} ! Повторите попытку позже.`,
            5
          );

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
