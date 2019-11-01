import { SET_ALERT, REMOVE_ALERT } from "../actions/actionTypes";

const initialState = { alert: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return { alert: action.payload };
    case REMOVE_ALERT:
      return { alert: null };

    default:
      return state;
  }
};
