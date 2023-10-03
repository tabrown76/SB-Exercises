import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
      <table className="App">
        <Board />
      </table>
  );
}

export default App;
