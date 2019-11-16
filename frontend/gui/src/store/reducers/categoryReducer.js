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
} from "../actions/actionTypes";

const initialState = {
  categories: null,
  current: null,
  loading: true,
  error: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
        loading: false
      };
    case ADD_CATEGORY:
      return {
        ...state,
        loading: false
      };
    case SEARCH_CATEGORIES:
      return {
        ...state,
        categories: payload
      };
    case CATEGORY_CURRENT:
      return {
        ...state,
        current: payload
      };
    case CATEGORY_CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        loading: false
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        loading: false
      };
    case CATEGORY_LOADING:
      return {
        ...state,
        loading: true
      };
    case CATEGORIES_ERROR:
      console.error("CATEGORIES_ERROR :", payload);
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
};
