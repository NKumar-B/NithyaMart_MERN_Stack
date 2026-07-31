import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { ShopProvider } from "./context/ShopContext";

import "./styles/reset.css";
import "./styles/variables.css";
import "./styles/typography.css";
import "./styles/global.css";
import "./styles/utilities.css";
import "./styles/animations.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ShopProvider>
      <App />
    </ShopProvider>
  </React.StrictMode>
);