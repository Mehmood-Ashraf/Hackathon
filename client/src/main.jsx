import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { UserProvider } from "./context/UserContext.jsx";
import {ThemeProvider} from "./context/ThemeContext.jsx"

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </UserProvider>
);
