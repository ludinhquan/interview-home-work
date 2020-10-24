import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store, { sagaMiddleware, saga } from "@/store";

import "./index.less";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

sagaMiddleware.run(saga);
