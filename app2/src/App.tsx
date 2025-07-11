import React from "react";
import ReactDOM from "react-dom/client";

import App2Content from "./components/App2Content/App2Content";

import "./index.css";


const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(<App2Content />);
