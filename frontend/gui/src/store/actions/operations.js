import {
  GET_OPERATIONS,
  SET_LOADING,
  OPERATIONS_ERROR,
  ADD_OPERATION,
  DELETE_OPERATION,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_OPERATION,
  SEARCH_OPERATIONS
} from "./actionTypes";

import axios from "axios";
import { setAlert } from "./alerts";

let headers;

// Get operations from server
export const getOperations = token => dispatch => {
  setLoading();

  headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + token
  };

  axios
    .get("http://127.0.0.1:8000/api/v1/operations/", {
      headers: headers
    })
    .then(res => {
      dispatch({
        type: GET_OPERATIONS,
        payload: res.data
      });
    })
    .catch(error => {
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
    });
};

// Add operation
export const addOperation = (operation, user) => dispatch => {
  setLoading();
  axios
    .post(
      `http://127.0.0.1:8000/api/v1/operations/`,
      {
        credit: operation.credit,
        removeFromAmount: true,
        category: operation.category,
        wallet: operation.wallet,
        created_at: operation.created_at,
        owner: user.user_id
      },
      {
        headers: headers
      }
    )
    .then(res => {
      dispatch(setAlert("Запись создана.", "success"));
      dispatch({
        type: ADD_OPERATION,
        payload: res.data
      });
    })
    .catch(error => {
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
    });
};

// Delete operation from server
export const deleteOperation = id => dispatch => {
  setLoading();

  axios
    .delete(`http://127.0.0.1:8000/api/v1/operations/${id}/`, {
      headers: headers
    })
    .then(res => {
      dispatch(setAlert("Запись удалена.", "success"));

      dispatch({
        type: DELETE_OPERATION,
        payload: id
      });
    })
    .catch(error => {
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
    });
};

// Update operation on server
export const updateOperation = (operation, user) => dispatch => {
  setLoading();
  axios
    .put(
      `http://127.0.0.1:8000/api/v1/operations/${operation.id}/`,
      {
        credit: operation.credit,
        removeFromAmount: true,
        category: operation.category,
        wallet: operation.wallet,
        created_at: operation.created_at,
        owner: user.user_id
      },
      {
        headers: headers
      }
    )
    .then(res => {
      dispatch(setAlert("Запись обновлена.", "success"));
      dispatch({
        type: UPDATE_OPERATION,
        payload: res.data
      });
    })
    .catch(error => {
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
    type: SET_CURRENT,
    payload: operation
  };
};

// Clear current operation
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT
  };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
