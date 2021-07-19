import React from "react";
import "./App.css";
import RoversGrid from "./RoversGrid/RoversGrid";
function App() {
  // Define how big the terrian will be
  const maxTerrainSize = { x: 6, y: 10 };
  const CSV_ADDRESS = "rover_instructions.csv";

  return (
    <div className="App">
      <h1>Rover Coding Challenge</h1>
      <RoversGrid maxTerrainSize={maxTerrainSize} csvAddress={CSV_ADDRESS} />
    </div>
  );
}

export default App;
