import {
  GET_WALLETS,
  WALLET_LOADING,
  WALLETS_ERROR,
  ADD_WALLET,
  DELETE_WALLET,
  WALLET_CURRENT,
  WALLET_CLEAR_CURRENT,
  UPDATE_WALLET,
  SEARCH_WALLETS
} from "../actions/actionTypes";

const initialState = {
  wallets: null,
  current: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_WALLETS:
      return {
        ...state,
        wallets: payload,
        loading: false
      };
    case ADD_WALLET:
      return {
        ...state,
        loading: false
      };
    case SEARCH_WALLETS:
      return {
        ...state,
        wallets: payload
      };
    case WALLET_CURRENT:
      return {
        ...state,
        current: payload
      };
    case WALLET_CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case UPDATE_WALLET:
      return {
        ...state,
        loading: false
      };
    case DELETE_WALLET:
      return {
        ...state,
        loading: false
      };
    case WALLET_LOADING:
      return {
        ...state,
        loading: true
      };
    case WALLETS_ERROR:
      console.error("WALLETS_ERROR :", payload);
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
};
