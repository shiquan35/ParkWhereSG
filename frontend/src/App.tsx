import React from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import ApiCall from "./components/ApiCall";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ApiCall />} />
        {/* <Route path="/map" element={<DisplayMap />} /> */}
      </Routes>
    </>
  );
}

export default App;
