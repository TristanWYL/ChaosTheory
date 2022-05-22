import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { getBTCExchangeRates } from "./misc/remote";
import { updateRates } from "./misc/state";
import { INTERVAL_FOR_FETCHING_RATES_SEC } from "./settings";

// Initialize the data fetching
const initializeDataFetching = () => {
  const time = Date.now();
  getBTCExchangeRates().then((rate) => updateRates(time, rate));
};
initializeDataFetching();
setInterval(() => {
  initializeDataFetching();
}, INTERVAL_FOR_FETCHING_RATES_SEC * 1000);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
