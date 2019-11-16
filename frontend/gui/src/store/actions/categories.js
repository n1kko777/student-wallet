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

import axios from "axios";
import { setAlert } from "./alerts";
import { getUser } from "./user";
import { logout } from "./auth";

// Get categories from server
export const getCategorys = () => dispatch => {
  setLoading();

  axios
    .get("http://127.0.0.1:8000/api/v1/categories/")
    .then(res => {
      const categories = res.data;

      dispatch({
        type: GET_CATEGORIES,
        payload: categories
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
    .post(`http://127.0.0.1:8000/api/v1/categories/`, {
      category_name: category.category_name,
      category_color: category.category_color
    })
    .then(res => {
      dispatch(setAlert("Запись создана.", "success"));
      dispatch({
        type: ADD_CATEGORY
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
        type: CATEGORIES_ERROR,
        payload: error.message
      });
    });
};

// Delete category from server
export const deleteCategory = id => dispatch => {
  setLoading();

  axios
    .delete(`http://127.0.0.1:8000/api/v1/categories/${id}/`)
    .then(res => {
      dispatch(setAlert("Запись удалена.", "success"));

      dispatch({
        type: DELETE_CATEGORY,
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
        type: CATEGORIES_ERROR,
        payload: error.message
      });
    });
};

// Update category on server
export const updateCategory = category => dispatch => {
  setLoading();
  axios
    .put(`http://127.0.0.1:8000/api/v1/categories/${category.id}/`, {
      category_name: category.category_name,
      category_color: category.category_color
    })
    .then(res => {
      dispatch({
        type: UPDATE_CATEGORY
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
    dispatch(
      setAlert(
        `Произошла ошибка ${error.response.status} ${error.response.statusText}! Повторите попытку позже.`,
        "error"
      )
    );
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
