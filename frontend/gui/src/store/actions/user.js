import { GET_USER, USER_ERROR, USER_LOADING } from "../actions/actionTypes";

import axios from "axios";
import { setAlert } from "./alerts";
import { logout } from "./auth";

let headers;

// Get user from server
export const getUser = user => dispatch => {
  setLoading();

  headers = {
    "Content-Type": "application/json",
    Authorization: "Token " + user.token
  };

  axios
    .get(`http://127.0.0.1:8000/api/v1/users/${user.user_id}/`, {
      headers: headers
    })
    .then(res => {
      const user = res.data;
      user.user_amount = 0;

      user.wallets.map(
        wallet => (user.user_amount += parseFloat(wallet.wallet_amount))
      );

      setAlert("Данные получены", "sucess");
      dispatch({
        type: GET_USER,
        payload: user
      });
    })
    .catch(error => {
      dispatch(
        error.response !== undefined
          ? setAlert(
              `Произошла ошибка ${error.response.status} ${error.response.statusText}! Повторите попытку позже.`,
              "error"
            )
          : setAlert(
              `Произошла ошибка ${error.message} ! Повторите попытку позже.`,
              "error"
            )
      );

      dispatch(logout());
      dispatch({
        type: USER_ERROR,
        payload: error.message
      });
    });
};

// Set loading to true
export const setLoading = () => {
  return {
    type: USER_LOADING
  };
};
