import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Drawer from "./components/Drawer";
import Main from "./Main";
import { ClientInfoProvider } from "./ClientInfoContext";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

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
