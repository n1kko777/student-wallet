import { SET_ALERT, REMOVE_ALERT } from "./actionTypes";
// Set Alert
export const setAlert = (msg, type, time = 5000) => dispatch => {
  dispatch({ type: SET_ALERT, payload: { msg, type } });
  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT });
  }, time);
};
