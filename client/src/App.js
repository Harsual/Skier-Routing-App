import React, { useEffect, useState } from "react";
import "./App.css";
import Map from "./SkieResort";
import SkiResort from "./SkieResort";
import Popup from "./components/Popup/Popup";

function App() {
  // State to handle interactioon from node.js server and this react app
  const [SkiResortData, setSkiResortData] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setSkiResortData(data);
      });
  }, []);

  return SkiResortData ? (
    <div>
      <div className="container">
        <header>Weclome to the Ski-resort App</header>
        <div className="graph-container">
          <h1>Graph Visualization</h1>
          <SkiResort height={400} width={800} SkiResortData={SkiResortData} />
        </div>
        <Popup> </Popup>
        <div>
          <button className="large-button">Find Path</button>
          <button className="large-button">Find Facility </button>
          <button className="large-button">Create Profile</button>
        </div>
      </div>
    </div>
  ) : (
    <div> Loading Graph Info</div>
  );
}

export default App;
