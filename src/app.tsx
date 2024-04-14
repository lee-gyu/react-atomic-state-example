import React from "react";

import { createRoot } from "react-dom/client";
import { AtomForm } from "./atom-form.js";
import { NonAtomForm } from "./context-form.js";
import { AtomContext } from "./atom-context/context.js";

import "./_app.css";

function App() {
  return (
    <div className="app-container">
      <div className="form-rows">
        <h2>Default Store</h2>
        <AtomForm />
        <NonAtomForm />
      </div>
      <div className="form-rows">
        <h2>New Store</h2>
        <AtomContext>
          <AtomForm />
          <AtomForm />
        </AtomContext>
      </div>
    </div>
  );
}

createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
