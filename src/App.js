import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import './styles/App.css';
import Navbar from "./Navbar";
import Dog from "./Dog";
import Dogs from "./Dogs";
import db from "./db.json";
import Colors from "./Colors";
import Color from "./Color";
import Home from "./Home";

function App({data = db}) {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/dogs/:name" element={<Dog data={data} />} />
        <Route path="/dogs" element={<Dogs data={data} />} />
        <Route path="/colors/:color" element={<Color />} />
        <Route path="/colors" element={<Colors />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
