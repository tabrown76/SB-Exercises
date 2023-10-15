import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./Navbar";
import VendingMachine from "./VendingMachine";
import PotatoChips from "./PotatoChips";
import GranolaBar from "./GranolaBar";
import Peanuts from "./Peanuts";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<VendingMachine/>}/>
                <Route path="/potato-chips" element={<PotatoChips />}/>
                <Route path="/granola-bar" element={<GranolaBar />}/>
                <Route path="/peanuts" element={<Peanuts />}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;