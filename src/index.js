import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./assets/styles/scss/styles.scss";
import App from "./app";

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root"),
);
