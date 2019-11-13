import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import operationReducer from "./operationReducer";
import walletReducer from "./walletReducer";
import userReducer from "./userReducer";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  operations: operationReducer,
  wallets: walletReducer,
  user: userReducer
});
