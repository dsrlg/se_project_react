import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./components/Header/Header.jsx";
import App from "./components/App/App.jsx";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
<App />
</BrowserRouter>
</React.StrictMode>
);

 