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
} from "../actions/actionTypes";

const initialState = {
  operations: null,
  current: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_OPERATIONS:
      return {
        ...state,
        operations: payload,
        loading: false
      };
    case ADD_OPERATION:
      return {
        ...state,
        operations: [...state.operations, payload],
        loading: false
      };
    case SEARCH_OPERATIONS:
      return {
        ...state,
        operations: payload
      };
    case SET_CURRENT:
      return {
        ...state,
        current: payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case UPDATE_OPERATION:
      return {
        ...state,
        operations: state.operations.map(operation =>
          operation.id === payload.id ? payload : operation
        )
      };
    case DELETE_OPERATION:
      return {
        ...state,
        operations: state.operations.filter(
          operation => operation.id !== payload
        ),
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case OPERATIONS_ERROR:
      console.error("payload :", payload);
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
};
