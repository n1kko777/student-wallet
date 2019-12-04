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
} from "../actions/actionTypes";

const initialState = {
  operations: null,
  // day_start: moment().isoWeekday(1),
  // day_end: moment().isoWeekday(7),
  day_start: null,
  day_end: null,
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
        operations: state.operations.map(operation =>
          operation.id === payload.id ? payload : operation
        )
      };
    case UPDATE_OPERATION_DATE:
      return {
        ...state,
        day_start: payload.day_start,
        day_end: payload.day_end
      };
    case DELETE_OPERATION:
      return {
        ...state,
        operations: state.operations.filter(
          operation => operation.id !== payload
        ),
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
