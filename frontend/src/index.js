import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import HttpsRedirect from "react-https-redirect";
import { Provider } from "react-redux";
import store from "./store";

const app = (
  <Provider store={store}>
    <HttpsRedirect>
      <App />
    </HttpsRedirect>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
