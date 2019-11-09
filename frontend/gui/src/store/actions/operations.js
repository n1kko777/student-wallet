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
import { setAlert } from "./alerts";
import { logout } from "./auth";

// Get operations from server
export const getOperations = () => dispatch => {
  setLoading();

  axios
    .get("http://127.0.0.1:8000/api/v1/operations/")
    .then(res => {
      const operations = res.data;

      dispatch({
        type: GET_OPERATIONS,
        payload: operations
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
    .post(`http://127.0.0.1:8000/api/v1/operations/`, {
      credit: operation.credit,
      removeFromAmount: true,
      category: operation.category,
      wallet: operation.wallet,
      created_at: operation.created_at
    })
    .then(res => {
      dispatch(setAlert("Запись создана.", "success"));
      dispatch({
        type: ADD_OPERATION,
        payload: res.data
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
        type: OPERATIONS_ERROR,
        payload: error.message
      });
    });
};

// Delete operation from server
export const deleteOperation = id => dispatch => {
  setLoading();

  axios
    .delete(`http://127.0.0.1:8000/api/v1/operations/${id}/`)
    .then(res => {
      dispatch(setAlert("Запись удалена.", "success"));

      dispatch({
        type: DELETE_OPERATION,
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
        type: OPERATIONS_ERROR,
        payload: error.message
      });
    });
};

// Update operation on server
export const updateOperation = operation => dispatch => {
  setLoading();
  axios
    .put(`http://127.0.0.1:8000/api/v1/operations/${operation.id}/`, {
      credit: operation.credit,
      removeFromAmount: true,
      category: operation.category,
      wallet: operation.wallet,
      created_at: operation.created_at
    })
    .then(res => {
      dispatch(setAlert("Запись обновлена.", "success"));
      dispatch({
        type: UPDATE_OPERATION,
        payload: res.data
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
    dispatch(
      setAlert(
        `Произошла ошибка ${error.response.status} ${error.response.statusText}! Повторите попытку позже.`,
        "error"
      )
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
