import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import logo from "./assets/logo.png?inline";

/* Иконка вкладки встроена в код: сайт работает из любой подпапки без отдельных файлов. */
const icon = document.createElement("link");
icon.rel = "icon";
icon.type = "image/png";
icon.href = logo;
document.head.appendChild(icon);

const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
