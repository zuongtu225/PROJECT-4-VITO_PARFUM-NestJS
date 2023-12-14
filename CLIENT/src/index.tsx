import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import "react-toastify/dist/ReactToastify.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <PayPalScriptProvider
      options={{
        clientId:
          "AZbWChaFQdzWuXC3_lWT4p0EFY3voGhmxYwkiIJ6lFxr8E8OtCmXTIiznvgylIsex9qiJaZ6W-YuGs-y",
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </PayPalScriptProvider>
  </BrowserRouter>
);
