import axios from "axios";
import { endpointAPI } from "../constants";

import {
  GET_CATEGORIES,
  CATEGORY_LOADING,
  CATEGORIES_ERROR,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  CATEGORY_CURRENT,
  CATEGORY_CLEAR_CURRENT,
  UPDATE_CATEGORY,
  SEARCH_CATEGORIES
} from "./actionTypes";

import { message } from "antd";

import { getUser } from "./user";
import { logout } from "./auth";

// Get categories from server
export const getCategorys = () => dispatch => {
  setLoading();

  axios
    .get(`${endpointAPI}/categories/`)
    .then(res => {
      const categories = res.data;

      dispatch({
        type: GET_CATEGORIES,
        payload: categories
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
        type: CATEGORIES_ERROR,
        payload: error.message
      });

      dispatch(logout());
    });
};

// Add category
export const addCategory = category => dispatch => {
  setLoading();
  axios
    .post(`${endpointAPI}/categories/`, {
      category_name: category.category_name,
      category_color: category.category_color
    })
    .then(res => {
      message.success("Запись создана.");
      dispatch({
        type: ADD_CATEGORY
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
        type: CATEGORIES_ERROR,
        payload: error.message
      });
    });
};

// Delete category from server
export const deleteCategory = id => dispatch => {
  setLoading();

  axios
    .delete(`${endpointAPI}/categories/${id}/`)
    .then(res => {
      message.success("Запись удалена.");

      dispatch({
        type: DELETE_CATEGORY,
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
        type: CATEGORIES_ERROR,
        payload: error.message
      });
    });
};

// Update category on server
export const updateCategory = category => dispatch => {
  setLoading();
  axios
    .put(`${endpointAPI}/categories/${category.id}/`, {
      category_name: category.category_name,
      category_color: category.category_color
    })
    .then(res => {
      dispatch({
        type: UPDATE_CATEGORY
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
        type: CATEGORIES_ERROR,
        payload: error.message
      });
    });
};

// Search categories
export const searchCategorys = text => dispatch => {
  try {
    setLoading();

    const res = fetch(`/categories?q=${text}`);
    const data = res.json();

    dispatch({
      type: SEARCH_CATEGORIES,
      payload: data
    });
  } catch (error) {
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
      type: CATEGORIES_ERROR,
      payload: error.message
    });
  }
};

// Set current category
export const setCurrent = category => {
  return {
    type: CATEGORY_CURRENT,
    payload: category
  };
};

// Clear current category
export const clearCurrent = () => {
  return {
    type: CATEGORY_CLEAR_CURRENT
  };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: CATEGORY_LOADING
  };
};
