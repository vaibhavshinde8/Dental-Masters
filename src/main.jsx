import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fontsource/playfair-display";
import "@fontsource/cabin";
import { AppProvider } from "./store/auth.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import ScrolltoTop from "./Components/ScrolltoTop.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <ScrolltoTop />
      <AppProvider>
        <App />
      </AppProvider>
    </Router>
  </StrictMode>
);
