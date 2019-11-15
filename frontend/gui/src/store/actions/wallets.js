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
import { setAlert } from "./alerts";
import { getUser } from "./user";
import { logout } from "./auth";

// Get wallets from server
export const getWallets = () => dispatch => {
  setLoading();

  axios
    .get("http://127.0.0.1:8000/api/v1/wallets/")
    .then(res => {
      const wallets = res.data;

      dispatch({
        type: GET_WALLETS,
        payload: wallets
      });
    })
    .catch(error => {
      dispatch(
        error.response !== undefined
          ? setAlert(
              `Произошла ошибка ${error.response.status} ${error.response.statusText}! Повторите попытку позже.`,
              "error"
            )
          : setAlert(
              `Произошла ошибка ${error.message} ! Повторите попытку позже.`,
              "error"
            )
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
    .post(`http://127.0.0.1:8000/api/v1/wallets/`, {
      wallet_amount: wallet.wallet_amount,
      wallet_name: wallet.wallet_name,
      wallet_color: wallet.wallet_color
    })
    .then(res => {
      dispatch(setAlert("Запись создана.", "success"));
      dispatch({
        type: ADD_WALLET
      });
      dispatch(getUser());
    })
    .catch(error => {
      dispatch(
        error.response !== undefined
          ? setAlert(
              `Произошла ошибка ${error.response.status} ${error.response.statusText}! Повторите попытку позже.`,
              "error"
            )
          : setAlert(
              `Произошла ошибка ${error.message} ! Повторите попытку позже.`,
              "error"
            )
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
    .delete(`http://127.0.0.1:8000/api/v1/wallets/${id}/`)
    .then(res => {
      dispatch(setAlert("Запись удалена.", "success"));

      dispatch({
        type: DELETE_WALLET,
        payload: id
      });
    })
    .catch(error => {
      dispatch(
        error.response !== undefined
          ? setAlert(
              `Произошла ошибка ${error.response.status} ${error.response.statusText}! Повторите попытку позже.`,
              "error"
            )
          : setAlert(
              `Произошла ошибка ${error.message} ! Повторите попытку позже.`,
              "error"
            )
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
    .put(`http://127.0.0.1:8000/api/v1/wallets/${wallet.id}/`, {
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
      dispatch(
        error.response !== undefined
          ? setAlert(
              `Произошла ошибка ${error.response.status} ${error.response.statusText}! Повторите попытку позже.`,
              "error"
            )
          : setAlert(
              `Произошла ошибка ${error.message} ! Повторите попытку позже.`,
              "error"
            )
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
    dispatch(
      setAlert(
        `Произошла ошибка ${error.response.status} ${error.response.statusText}! Повторите попытку позже.`,
        "error"
      )
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
