import {
  REGISTER_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_START,
  AUTH_SUCCESS,
  REMIND_ME
} from "../actions/actionTypes";

const initialState = {
  user: {},
  isRegister: false,
  isRemindMe: true,
  error: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isRegister: action.isRegister,
        loading: false,
        error: null
      };
    case AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        user: action.user,
        loading: false,
        error: null
      };
    case AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        user: {}
      };
    case REMIND_ME:
      return {
        ...state,
        isRemindMe: action.isRemindMe
      };

    default:
      return state;
  }
};
