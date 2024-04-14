import React from "react";

import { createRoot } from "react-dom/client";
import { AtomForm } from "./atom-form.js";
import { NonAtomForm } from "./context-form.js";

import "./_app.css";

function App() {
  return (
    <div className="app">
      <AtomForm />
      <NonAtomForm />
    </div>
  );
}

createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
