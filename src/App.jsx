import React from "react";
import "./App.less";
import { Router } from "react-router-dom";
import history from "./services/history";
import App from "./container";
import { AuthContextProvider, AppContextProvider } from "./contexts/index";

const RenderApp = () => {
  return (
    <AuthContextProvider>
      <AppContextProvider>
        <Router history={history}>
          <App />
        </Router>
      </AppContextProvider>
    </AuthContextProvider>
  );
};
export default RenderApp;
