import {
  GET_OPERATIONS,
  OPERATION_LOADING,
  OPERATIONS_ERROR,
  ADD_OPERATION,
  DELETE_OPERATION,
  OPERATION_CURRENT,
  OPERATION_CLEAR_CURRENT,
  UPDATE_OPERATION,
  SEARCH_OPERATIONS
} from "./actionTypes";

import axios from "axios";
import { message } from "antd";

import { logout } from "./auth";

// Get operations from server
export const getOperations = () => dispatch => {
  setLoading();

  axios
    .get("https://studwallet.herokuapp.com/api/v1/operations/")
    .then(res => {
      const operations = res.data;

      dispatch({
        type: GET_OPERATIONS,
        payload: operations
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
        type: OPERATIONS_ERROR,
        payload: error.message
      });

      dispatch(logout());
    });
};

// Add operation
export const addOperation = operation => dispatch => {
  setLoading();
  axios
    .post(`https://studwallet.herokuapp.com/api/v1/operations/`, {
      credit: operation.credit,
      category: operation.category,
      wallet: operation.wallet,
      created_at: operation.created_at
    })
    .then(res => {
      message.success("Запись создана.");
      dispatch({
        type: ADD_OPERATION,
        payload: res.data
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
        type: OPERATIONS_ERROR,
        payload: error.message
      });
    });
};

// Delete operation from server
export const deleteOperation = id => dispatch => {
  setLoading();

  axios
    .delete(`https://studwallet.herokuapp.com/api/v1/operations/${id}/`)
    .then(res => {
      message.success("Запись удалена.");

      dispatch({
        type: DELETE_OPERATION,
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
        type: OPERATIONS_ERROR,
        payload: error.message
      });
    });
};

// Update operation on server
export const updateOperation = operation => dispatch => {
  setLoading();
  axios
    .put(`https://studwallet.herokuapp.com/api/v1/operations/${operation.id}/`, {
      credit: operation.credit,
      category: operation.category,
      wallet: operation.wallet,
      created_at: operation.created_at
    })
    .then(res => {
      message.success("Запись обновлена.");

      dispatch({
        type: UPDATE_OPERATION,
        payload: res.data
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
        type: OPERATIONS_ERROR,
        payload: error.message
      });
    });
};

// Search operations
export const searchOperations = text => dispatch => {
  try {
    setLoading();

    const res = fetch(`/operations?q=${text}`);
    const data = res.json();

    dispatch({
      type: SEARCH_OPERATIONS,
      payload: data
    });
  } catch (error) {
    message.error(
      `Произошла ошибка ${error.response.status} ${error.response.statusText}! Повторите попытку позже.`
    );

    dispatch({
      type: OPERATIONS_ERROR,
      payload: error.message
    });
  }
};

// Set current operation
export const setCurrent = operation => {
  return {
    type: OPERATION_CURRENT,
    payload: operation
  };
};

// Clear current operation
export const clearCurrent = () => {
  return {
    type: OPERATION_CLEAR_CURRENT
  };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: OPERATION_LOADING
  };
};
