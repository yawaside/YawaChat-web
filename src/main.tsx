import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import logo from "./assets/logo.png?inline";

// Иконка вкладки встроена в код, чтобы сайт работал на GitHub Pages из любой подпапки.
const icon = document.createElement("link");
icon.rel = "icon";
icon.type = "image/png";
icon.href = logo;
document.head.appendChild(icon);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
