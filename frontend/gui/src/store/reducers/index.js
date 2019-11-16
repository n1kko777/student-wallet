import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import operationReducer from "./operationReducer";
import walletReducer from "./walletReducer";
import categoryReducer from "./categoryReducer";
import userReducer from "./userReducer";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  operations: operationReducer,
  wallets: walletReducer,
  categories: categoryReducer,
  user: userReducer
});
