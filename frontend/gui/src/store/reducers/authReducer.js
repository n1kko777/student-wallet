import {
  REGISTER_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_START,
  AUTH_SUCCESS,
  REMIND_ME
} from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  user: {},
  isRegister: false,
  isRemindMe: true,
  error: null,
  loading: false
};

const remindMe = (state, action) => {
  return updateObject(state, { isRemindMe: action.isRemindMe });
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const registerSuccess = (state, action) => {
  return updateObject(state, {
    isRegister: action.isRegister,
    loading: false,
    error: null
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    user: action.user,
    loading: false,
    error: null
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    user: {}
  });
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return registerSuccess(state, action);
    case AUTH_START:
      return authStart(state, action);
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    case AUTH_FAIL:
      return authFail(state, action);
    case AUTH_LOGOUT:
      return authLogout(state, action);
    case REMIND_ME:
      return remindMe(state, action);

    default:
      return state;
  }
};

export default authReducers;
