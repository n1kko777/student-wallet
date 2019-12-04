import axios from "axios";
import { endpointAPI } from "../constants";

import {
  GET_OPERATIONS,
  OPERATION_LOADING,
  OPERATIONS_ERROR,
  ADD_OPERATION,
  DELETE_OPERATION,
  OPERATION_CURRENT,
  OPERATION_CLEAR_CURRENT,
  UPDATE_OPERATION,
  UPDATE_OPERATION_DATE,
  SEARCH_OPERATIONS
} from "./actionTypes";

import { message } from "antd";

import { logout } from "./auth";

// Get operations from server
export const getOperations = () => dispatch => {
  setLoading();

  axios
    .get(`${endpointAPI}/operations/`)
    .then(res => {
      dispatch({
        type: GET_OPERATIONS,
        payload: res.data
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
    .post(`${endpointAPI}/operations/`, {
      credit: parseFloat(operation.credit).toFixed(2),
      category: operation.category,
      wallet: operation.wallet,
      operation_type:
        operation.category === null || operation.category === undefined ? 1 : 0,
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
        type: OPERATIONS_ERROR,
        payload: error.message
      });
    });
};

// Delete operation from server
export const deleteOperation = id => dispatch => {
  setLoading();

  axios
    .delete(`${endpointAPI}/operations/${id}/`)
    .then(res => {
      message.success("Запись удалена.");

      dispatch({
        type: DELETE_OPERATION,
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
        type: OPERATIONS_ERROR,
        payload: error.message
      });
    });
};

// Update operation on server
export const updateOperation = operation => dispatch => {
  setLoading();
  axios
    .put(`${endpointAPI}/operations/${operation.id}/`, {
      credit: parseFloat(operation.credit).toFixed(2),
      category: operation.category,
      wallet: operation.wallet,
      operation_type:
        operation.category === null || operation.category === undefined ? 1 : 0,
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
        type: OPERATIONS_ERROR,
        payload: error.message
      });
    });
};

export const updateFilterDate = (day_start, day_end) => dispatch => {
  dispatch({
    type: UPDATE_OPERATION_DATE,
    payload: { day_start, day_end }
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
