import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import operationReducer from "./operationReducer";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  operations: operationReducer
});
