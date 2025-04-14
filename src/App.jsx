import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notifications from "./components/Notifications"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Notifications />} />
      </Routes>
    </Router>
  );
}

export default App;
