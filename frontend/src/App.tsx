import React, { FC, useState } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { LTA } from "./components/LTA";
import { URA } from "./components/URA";
/*
what am i gonna do:
1. create 2 routes: LTA and URA
2. GET parking information from each and render on each route
*/

const App: FC = () => {
  return (
    <>
      <div>Hello</div>
      <Routes>
        <Route path="/lta" element={<LTA />}></Route>
        <Route path="/ura" element={<URA />}></Route>
      </Routes>
    </>
  );
};

export default App;
