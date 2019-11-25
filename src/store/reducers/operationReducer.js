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
} from "../actions/actionTypes";

const initialState = {
  operations: null,
  current: null,
  loading: true,
  error: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_OPERATIONS:
      return {
        ...state,
        operations: payload.reverse(),
        loading: false
      };
    case ADD_OPERATION:
      return {
        ...state,
        operations: [...state.operations.reverse(), payload].reverse(),
        loading: false
      };
    case SEARCH_OPERATIONS:
      return {
        ...state,
        operations: payload
      };
    case OPERATION_CURRENT:
      return {
        ...state,
        current: payload
      };
    case OPERATION_CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case UPDATE_OPERATION:
      return {
        ...state,
        operations: state.operations
          .reverse()
          .map(operation => (operation.id === payload.id ? payload : operation))
          .reverse()
      };
    case DELETE_OPERATION:
      return {
        ...state,
        operations: state.operations
          .reverse()
          .filter(operation => operation.id !== payload)
          .reverse(),
        loading: false
      };
    case OPERATION_LOADING:
      return {
        ...state,
        loading: true
      };
    case OPERATIONS_ERROR:
      console.error("OPERATIONS_ERROR :", payload);
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
};
