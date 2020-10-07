import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Drawer from "./components/Drawer";
import Main from "./Main";
import { ClientInfoProvider } from "./providers/ClientInfoContext";

export default function App() {
  return (
    <ClientInfoProvider>
      <Router>
        <div style={{ display: "flex" }}>
          <Drawer></Drawer>
          <Main></Main>
        </div>
      </Router>
    </ClientInfoProvider>
  );
}
