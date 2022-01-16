// import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import * as React from "react";

// import ThirdWeb
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";

// include what chains you want to support - rinkeby = 4
const supportedChainIds = [4];

// include what type of wallet you want to support
// support metamask as "injected wallet"
const connectors = {
  injected: {},
};

// Render the App component to the DOM
ReactDOM.render(
  <React.StrictMode>
    <ThirdwebWeb3Provider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <div className="landing">
        <App />
      </div>
    </ThirdwebWeb3Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
