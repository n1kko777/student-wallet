import { GET_USER, USER_ERROR, USER_LOADING } from "../actions/actionTypes";

const initialState = {
  loading: false,
  user: {
    current_user: null,
    username: null,
    wallets: null,
    categories: null,
    user_earn: null,
    user_spend: null,
    user_amount: null,
    operations: null
  }
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USER:
      return {
        ...state,
        user: payload,
        loading: false
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case USER_ERROR:
      console.error("payload :", payload);
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
};
