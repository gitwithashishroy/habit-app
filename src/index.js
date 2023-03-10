import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./styles/index.css";
import App from "./components/App";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// console.log("After STATE", store.getState());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode >
    <BrowserRouter >
    <Provider store={store} >
      <ToastContainer/>
      <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
